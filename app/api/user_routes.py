from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)



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