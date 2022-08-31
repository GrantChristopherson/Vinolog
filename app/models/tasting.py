from .db import db





class Tasting(db.Model):
  __tablename__ = 'tastings'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  producer = db.Column(db.String(50), nullable=False)
  region = db.Column(db.String(100), nullable=False)
  vineyard = db.Column(db.String(50))
  varietal = db.Column(db.String(100), nullable=False)
  vintage = db.Column(db.Integer)
  other_info = db.Column(db.String(200))
  sight = db.Column(db.String(200), nullable=False)
  nose = db.Column(db.String(200), nullable=False)
  palate = db.Column(db.String(200), nullable=False)
  thoughts = db.Column(db.String(200))
  love = db.Column(db.Boolean, nullable=False)

  user = db.relationship('User', back_populates='tastings')
  discussions = db.relationship('Discussion', back_populates='tastings',cascade='all, delete')


  def to_dict(self):
    return {
      'id': self.id,
      'producer': self.producer,
      'region': self.region,
      'vineyard': self.vineyard,
      'varietal': self.varietal,
      'vintage': self.vintage,
      'other_info': self.other_info,
      'sight': self.sight,
      'nose': self.nose,
      'palate': self.palate,
      'thoughts': self.thoughts,
      'love': self.love,
      'user': self.user.to_dict()
    }
