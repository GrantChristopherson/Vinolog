from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin



friends = db.Table(
    "friends",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("following_id", db.Integer, db.ForeignKey("users.id"))
)



class User(db.Model, UserMixin):
    __tablename__ = 'users'
    

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_image = db.Column(db.String(1000))
    bio = db.Column(db.String(200))

    tastings = db.relationship('Tasting', back_populates='user',cascade='all, delete')
    discussions = db.relationship('Discussion', back_populates='user',cascade='all, delete')

    user_cheers = db.relationship(
        "Tasting",
        secondary="cheers",
        back_populates="tasting_cheers",
        cascade='all, delete'
    )

    followers = db.relationship(
        "User",
        secondary=friends,
        primaryjoin=(friends.c.follower_id == id),
        secondaryjoin=(friends.c.following_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profileImage': self.profile_image,
            'bio': self.bio
        }


    def to_dict_get_followings(self):
        return {
            'followed': [x.to_dict() for x in self.following.all()]
        }


    def to_dict_get_followers(self):
        return {
            'followers': [x.to_dict() for x in self.followers.all()]
        }


    def to_dict_get_cheers(self):
        return {
            'cheers': [tasting.to_dict() for tasting in self.user_cheers]
        }    