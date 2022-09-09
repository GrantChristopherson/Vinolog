from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from app.models import db, Tasting
from app.forms.tasting_form import TastingForm

tasting_routes = Blueprint('tastings', __name__)



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
      other_info = form.data['other_info'],
      sight = form.data['sight'],
      nose = form.data['nose'],
      palate = form.data['palate'],
      thoughts = form.data['thoughts'],
      love = form.data['love'],
      user = current_user
    )
    db.session.add(tasting)
    db.session.commit()
    return tasting.to_dict()
  else:
    return {'errors': form.errors}, 401



# Update a tasting card  
@tasting_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit_tasting_card(id):
  tasting = Tasting.query.get(id)
  if tasting.user_id != current_user.id:
    redirect('api/auth/unauthorized')

  form = TastingForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    tasting.producer = form.data['producer']
    tasting.region = form.data['region']
    tasting.vineyard = form.data['vineyard']
    tasting.varietal = form.data['varietal']
    tasting.vintage = form.data['vintage']
    tasting.other_info = form.data['other_info']
    tasting.sight = form.data['sight']
    tasting.nose = form.data['nose']
    tasting.palate = form.data['palate']
    tasting.thoughts = form.data['thoughts']
    tasting.love = form.data['love']
    

    db.session.commit()
    return tasting.to_dict()

  return {'errors': form.errors}, 401



# Delete a tasting card
@tasting_routes.route('/<int:tasting_id>', methods=['DELETE'])
@login_required
def delete_tasting_card(tasting_id):
  tasting = Tasting.query.get(tasting_id)

  if tasting.user_id != current_user.id:
    redirect('api/auth/unauthorized')

  db.session.delete(tasting)
  db.session.commit()
  return {'message': 'Tasting Deleted'}