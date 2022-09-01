from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from app.models import db, User, Tasting, Discussion, discussion
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