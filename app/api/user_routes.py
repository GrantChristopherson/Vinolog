from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms.signup_form import SignUpForm
import boto3
from app.config import Config


user_routes = Blueprint('users', __name__)



s3 = boto3.client('s3', 
                  aws_access_key_id=Config.AWS_ACCESS_KEY_ID, 
                  aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY, 
                  region_name=Config.AWS_DEFAULT_REGION)



def upload_to_s3(file):
    """Upload a file to your S3 bucket and return its public URL."""
    
    filename = file.filename
    bucket_name = 'profile-photos-vinolog'
    s3.upload_fileobj(file, bucket_name, filename, ExtraArgs={"ACL": "public-read"})
    
    return f"https://{bucket_name}.s3.amazonaws.com/{filename}"




# Get all users
@user_routes.route('/')
@login_required
def users():
    try:

        users = User.query.all()
        return {'users': [user.to_dict() for user in users]}
    
    except Exception as e:
        return {"error": str(e)}, 500



# Get user by id
@user_routes.route('/<int:id>')
@login_required
def user(id):
    try:

        user = User.query.get(id)
        return user.to_dict()

    except Exception as e:
        return {"error": str(e)}, 500



# Get user Friend in the Field followings
@user_routes.route('/<int:id>/following')
@login_required
def user_following(id):
    try:

        following_users = User.query.get(id)
        return  following_users.to_dict_get_followings()

    except Exception as e:
        return {"error": str(e)}, 500



# Get user Friends in the Field followers
@user_routes.route('/<int:id>/followers')
@login_required
def user_follower(id):
    try:

        followers = User.query.get(id)
        return  followers.to_dict_get_followers()
    
    except Exception as e:
        return {"error": str(e)}, 500



# User follows another user as Friend in the Field
@user_routes.route('<int:id>/following/<int:newFollowingId>', methods=['PUT'])
@login_required
def user_add_following(id, newFollowingId):
    try:

        user_current_following_list = User.query.get(id).following
        new_following_user = User.query.get(newFollowingId)
        
        if new_following_user not in user_current_following_list:
            user_current_following_list.append(new_following_user)
            db.session.commit()
        return {'followings': [x.to_dict() for x in user_current_following_list]}
            
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500
    


# Delete user following of Friend in the Field
@user_routes.route('/<int:id>/following/<int:deleteUserId>', methods=['DELETE'])
@login_required
def remove_following(id, deleteUserId):
    try:

        user_current_following_list = User.query.get(id).following
        delete_user = User.query.get(deleteUserId)
        
        if delete_user in user_current_following_list:
            user_current_following_list.remove(delete_user)
            db.session.commit()
        return {'followings': [x.to_dict() for x in user_current_following_list]}
    
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500
    


# Get user cheers
@user_routes.route('/<int:id>/cheers')
@login_required
def user_likes(id):
    try:

        cheers_users = User.query.get(id)
        return  cheers_users.to_dict_get_cheers()
    
    except Exception as e:
        return {"error": str(e)}, 500
    


# Edit user profile_image or bio
@user_routes.route('/<int:id>/edit', methods=['PUT'])
def edit_user(id):
    try:

        user = User.query.get(id)

        if user.id != current_user.id:
            redirect('api/auth/unauthorized')

        profile_image_url = user.profile_image
        file = request.files.get('profile_image') # Checking for an image upload in the form data
        if file and file.filename != '':
        
            if user.profile_image:               # Deletes the previous image from S3 if it exists
                s3.delete_object(Bucket='wine-labels-vinolog', Key=user.profile_image.split('/')[-1])

            profile_image_url = upload_to_s3(file)  # If there's a file, uploading it to S3

        form = SignUpForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            user.profile_image = profile_image_url
            user.bio = form.data['bio']
           
            
            db.session.commit()
            return user.to_dict()
        return {'errors': form.errors}, 400
    
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500