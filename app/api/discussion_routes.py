from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Tasting, Discussion
from app.forms.discussion_form import DiscussionForm

discussion_routes = Blueprint('discussion', __name__)



def validation_errors_to_error_messages(validation_errors):
  """
  Simple function that turns the WTForms validation errors into a simple list
  """
  # return
  #   errorMessages = []
  #   for field in validation_errors:
  #       for error in validation_errors[field]:
  #           errorMessages.append(f'{field} : {error}')
  #   return errorMessages



# Get all comments
@discussion_routes.route('/comments/all')
@login_required
def get_all_comments():
  try:

    comments = Discussion.query.all()
    return {'comment': [comment.to_dict() for comment in comments]}
  
  except Exception as e:
    return {"error": str(e)}, 500



# Get all comments by tasting id
@discussion_routes.route('/tastings/<int:tasting_id>')
@login_required
def get_tasting_card_comments(tasting_id):
  try:

    comments = Discussion.query.filter(Discussion.tasting_id == tasting_id).all()
    return {'comment': [comment.to_dict() for comment in comments]}
  
  except Exception as e:
    return {"error": str(e)}, 500



# Create a new comment by tasting id
@discussion_routes.route('/tastings/<int:tasting_id>', methods=['POST'])
@login_required
def create_comment(tasting_id):
  try:

    tasting = Tasting.query.get(tasting_id)
    form = DiscussionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      comment = Discussion(
        comment = form.data['comment'],
        tasting_id = tasting.id,
        user_id = current_user.get_id()
      )
      db.session.add(comment)
      db.session.commit()
      return {'comment': [comment.to_dict()]}

    return {'errors': form.errors}, 400
  
  except Exception as e:
    db.session.rollback()
    return {"error": str(e)}, 500



# Update a comment
@discussion_routes.route('/comments/edit/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):
  try:

    comment = Discussion.query.get(id)
    form = DiscussionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      comment.comment = form.data['comment']

      db.session.commit()
      return comment.to_dict()
    
    return {'errors': form.errors}, 400
  
  except Exception as e:
    db.session.rollback()
    return {"error": str(e)}, 500



# Delete a comment
@discussion_routes.route('/comments/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
  try:

    comment = Discussion.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Comment Deleted'}

  except Exception as e:
    db.session.rollback()
    return {"error": str(e)}, 500