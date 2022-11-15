from .db import db




class Discussion(db.Model):
  __tablename__ = 'discussions'
 

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  tasting_id = db.Column(db.Integer, db.ForeignKey('tastings.id'), nullable=False)
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

