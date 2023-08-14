from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from app.models import db, Tasting, User
from app.forms.tasting_form import TastingForm
from sqlalchemy import or_
# import boto3
# from app.config import Config
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
logger.debug("Starting Flask application.")



tasting_routes = Blueprint('tastings', __name__)


# s3 = boto3.client('s3', 
#                   aws_access_key_id=Config.AWS_ACCESS_KEY_ID, 
#                   aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY, 
#                   region_name=Config.AWS_DEFAULT_REGION)



def validation_errors_to_error_messages(validation_errors):
  """
  Simple function that turns the WTForms validation errors into a simple list
  """
  # return
    # errorMessages = []
    # for field in validation_errors:
    #     for error in validation_errors[field]:
    #         errorMessages.append(f'{field} : {error}')
    # return errorMessages



# Get current user's tasting cards  #tested successfully
@tasting_routes.route('/')
@login_required
def tastings():
  tastings = Tasting.query.filter(Tasting.user_id == current_user.id).all()

  return {'tastings': [tasting.to_dict() for tasting in tastings]}



# Get all user loved tasting cards   #tested successfully
@tasting_routes.route('/loved')
@login_required
def all_loved_tastings():
  # tastings = Tasting.query.filter(Tasting.love == True).all()
  tastings = Tasting.query.all()

  return {'tastings': [tasting.to_dict() for tasting in tastings  if tasting.love == True ]}



# Get a friends tasting cards          #tested successfully
@tasting_routes.route('/friends/<int:id>')
@login_required
def get_friends_tastings(id):
  tastings = Tasting.query.filter(Tasting.user_id == id).all()

  return {'tastings': [tasting.to_dict() for tasting in tastings]}



# Get all friends tasting cards
@tasting_routes.route('/field')
@login_required
def get_all_friends_tastings():
  logger.debug("Entering get_all_friends_tastings method")
  logger.info('Info level log')
  print('api start===========')
  user_ids_str = request.args.get('user_ids', '')
  print('user_ids_str===========', user_ids_str)
  user_ids = [int(id_) for id_ in user_ids_str.split(',') if id_.isdigit()]
  print('user_ids=====', user_ids)
  tastings= Tasting.query.filter(Tasting.user_id.in_(user_ids)).all()
  print('tastings=======', tastings)
  # print('return========', {'tastings': [tasting.to_dict() for tasting in tastings]})
  return {'tastings': [tasting.to_dict() for tasting in tastings]}



# Create a new tasting card           #tested successfully
@tasting_routes.route('/user/post', methods=['POST'])
@login_required
def post_tasting():
  form = TastingForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    tasting = Tasting(
      producer = form.data['producer'],
      region = form.data['region'],
      vineyard = form.data['vineyard'],
      varietal = form.data['varietal'],
      vintage = form.data['vintage'],
      color = form.data['color'],
      label_image = form.data['label_image'],
      other_info = form.data['other_info'],
      sight = form.data['sight'],
      nose = form.data['nose'],
      palate = form.data['palate'],
      thoughts = form.data['thoughts'],
      love = form.data['love'],
      user_id = current_user.id
    )
    db.session.add(tasting)
    db.session.commit()
    return tasting.to_dict()
  else:
    return {'errors': form.errors}, 401



# Update a tasting card                #tested successfully
@tasting_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit_tasting_card(id):
  tasting = Tasting.query.get(id)

  if tasting.user.id != current_user.id:
    redirect('api/auth/unauthorized')

  form = TastingForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    tasting.producer = form.data['producer']
    tasting.region = form.data['region']
    tasting.vineyard = form.data['vineyard']
    tasting.varietal = form.data['varietal']
    tasting.vintage = form.data['vintage']
    tasting.color = form.data['color']
    tasting.label_image = form.data['label_image']
    tasting.other_info = form.data['other_info']
    tasting.sight = form.data['sight']
    tasting.nose = form.data['nose']
    tasting.palate = form.data['palate']
    tasting.thoughts = form.data['thoughts']
    tasting.love = form.data['love']

    db.session.commit()
    return tasting.to_dict()

  return {'errors': form.errors}, 401



# Delete a tasting card                  #tested successfully
@tasting_routes.route('/<int:tasting_id>', methods=['DELETE'])
@login_required
def delete_tasting_card(tasting_id):
  tasting = Tasting.query.get(tasting_id)

  if tasting.user_id != current_user.id:
    redirect('api/auth/unauthorized')

  db.session.delete(tasting)
  db.session.commit()
  return {'message': 'Tasting Deleted'}



# Create a cheers                          #tested successfully
@tasting_routes.route('/<int:tasting_id>/cheers', methods=["PUT"])
@login_required
def cheers(tasting_id):
  user = User.query.get(current_user.id)
  tasting = Tasting.query.get(tasting_id)

  isUserCheers = False
  for cheeredUser in tasting.tasting_cheers:
    if (cheeredUser.id == current_user.id ):
      isUserCheers = True

  if (not isUserCheers):
    tasting.tasting_cheers.append(user)
    db.session.commit()

  return {"cheers": tasting.to_dict()}



# Delete a cheers                            #tested successfully
@tasting_routes.route('/<int:tasting_id>/cheers', methods=["DELETE"])
@login_required
def delete_cheers(tasting_id):
  user = User.query.get(current_user.id)
  tasting = Tasting.query.get(tasting_id)

  isUserCheers = False
  for cheeredUser in tasting.tasting_cheers:
    if (cheeredUser.id == current_user.id ):
      isUserCheers = True

  if (isUserCheers):
    tasting.tasting_cheers.remove(user)
    db.session.commit()

  return {"cheers": tasting.to_dict()}



# Search route                               #tested successfully
@tasting_routes.route('/search', methods=['GET'])
@login_required
def search():
  search_word = request.args.get('search_word')
  search_option = request.args.get('option')

  try:
    # search only tastings
    if search_option == "tastings":
      tastings = Tasting.query.filter(or_(
        Tasting.producer.ilike(f'%{search_word}%'),
        Tasting.region.ilike(f'%{search_word}%'),
        Tasting.vineyard.ilike(f'%{search_word}%'),
        Tasting.varietal.ilike(f'%{search_word}%'),
        Tasting.vintage.ilike(f'%{search_word}%'),
        Tasting.color.ilike(f'%{search_word}%'),
        Tasting.other_info.ilike(f'%{search_word}%'),
        Tasting.sight.ilike(f'%{search_word}%'),
        Tasting.nose.ilike(f'%{search_word}%'),
        Tasting.palate.ilike(f'%{search_word}%'),
        Tasting.thoughts.ilike(f'%{search_word}%'),
      )).all()
      
      return {'tastings': [tasting.to_dict() for tasting in tastings], 'users': []}

    # search only user usernames
    elif search_option == "users":
      users = User.query.filter(User.username.ilike(f'%{search_word}%')).all()
     
      return {'users': [user.to_dict() for user in users], 'tastings': []}

    else:
      # search both tables, tastings and usernames
      tastings = Tasting.query.filter(or_(
        Tasting.producer.ilike(f'%{search_word}%'),
        Tasting.region.ilike(f'%{search_word}%'),
        Tasting.vineyard.ilike(f'%{search_word}%'),
        Tasting.varietal.ilike(f'%{search_word}%'),
        Tasting.vintage.ilike(f'%{search_word}%'),
        Tasting.color.ilike(f'%{search_word}%'),
        Tasting.other_info.ilike(f'%{search_word}%'),
        Tasting.sight.ilike(f'%{search_word}%'),
        Tasting.nose.ilike(f'%{search_word}%'),
        Tasting.palate.ilike(f'%{search_word}%'),
        Tasting.thoughts.ilike(f'%{search_word}%'),
      )).all()
      
      users = User.query.filter(User.username.ilike(f'%{search_word}%')).all()
      
      return {'tastings': [tasting.to_dict() for tasting in tastings],
              'users': [user.to_dict() for user in users]}

  except Exception as e:
    return {"error": str(e)}, 500