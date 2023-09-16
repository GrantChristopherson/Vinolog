from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user
import boto3
from app.config import Config


auth_routes = Blueprint('auth', __name__)


s3 = boto3.client('s3', 
                  aws_access_key_id=Config.AWS_ACCESS_KEY_ID, 
                  aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY, 
                  region_name=Config.AWS_DEFAULT_REGION)



def upload_to_s3(file):
    """Upload a file to your S3 bucket and return its public URL."""
    
    filename = file.filename
    bucket_name = 'wine-labels-vinolog'
    s3.upload_fileobj(file, bucket_name, filename, ExtraArgs={"ACL": "public-read"})
    
    return f"https://{bucket_name}.s3.amazonaws.com/{filename}"




def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages



@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    try:

        if current_user.is_authenticated:
            return current_user.to_dict()
        return {'errors': ['Unauthorized']}
    
    except Exception as e:
        return {"error": str(e)}, 500



@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    try:

        form = LoginForm()
        # Get the csrf_token from the request cookie and put it into the
        # form manually to validate_on_submit can be used
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            # Add the user to the session, we are logged in!
            user = User.query.filter(User.email == form.data['email']).first()
            login_user(user)
            return user.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500



@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    try:

        logout_user()
        return {'message': 'User logged out'}
    
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500



@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    try:

        form = SignUpForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        profile_image_url = None  # Defaults to None
        file = request.files.get('profile_image') # Checking for an image upload in the form data
        if file and file.filename != '':
            profile_image_url = upload_to_s3(file)  # If there's a file, uploading it to S3

        if form.validate_on_submit():
            user = User(
                username=form.data['username'],
                email=form.data['email'],
                password=form.data['password'],
                profile_image= profile_image_url,
                bio= form.data['bio']
            )
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return user.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500



@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
