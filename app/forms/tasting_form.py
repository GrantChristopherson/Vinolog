from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SubmitField
from wtforms.validators import DataRequired




class TastingForm(FlaskForm):
  producer = StringField('Producer', validators=[DataRequired(message='Producer is required')])
  region = StringField('Region', validators=[DataRequired(message='Region is required')])
  vineyard = StringField('Vineyard')
  varietal = StringField('Varietal/Type', validators=[DataRequired(message='Varietal or type is required')])
  vintage = IntegerField('Vintage')
  other_info = StringField('Additional Information')
  sight = StringField('Sight', validators=[DataRequired(message='Description of how the wine looks is required')])
  nose = StringField('Nose', validators=[DataRequired(message='Description of wine aromatics is required')])
  palate = StringField('Palate', validators=[DataRequired(message='Description of the flavor profile is required')])
  thoughts = StringField('Additional Thoughts')
  love = BooleanField('Love?')
  submit = SubmitField("Submit")