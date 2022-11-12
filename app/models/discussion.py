from .db import db, environment, SCHEMA, add_prefix_for_prod




class Discussion(db.Model):
  __tablename__ = 'discussions'
  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  tasting_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tastings.id')), nullable=False)
  comment = db.Column(db.String(400), nullable=False)

  user = db.relationship('User', back_populates='discussions')
  tastings = db.relationship('Tasting', back_populates='discussions')


  def to_dict(self):
    return {
      'id': self.id,
      'comment': self.comment,
      'user_id': self.user_id,
      'tasting_id': self.tasting_id
    }

