from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, BooleanField, SubmitField
from wtforms.validators import DataRequired
from datetime import datetime



class TastingForm(FlaskForm):
  producer = StringField('Producer', validators=[DataRequired(message='Producer is required')])
  region = StringField('Region', validators=[DataRequired(message='Region is required')])
  vineyard = StringField('Vineyard')
  varietal = StringField('Varietal/Type', validators=[DataRequired(message='Varietal or type is required')])
  vintage = SelectField('Vintage', choices=[])
  color = SelectField('Color of Wine', choices=['Red', 'White', 'Rose', 'Sparkling', 'Orange', 'Dessert', 'Other'], validators=[DataRequired(message='Color of Wine is required')])
  label_image = StringField('Label Image')
  other_info = StringField('Additional Information')
  sight = StringField('Sight', validators=[DataRequired(message='Description of how the wine looks is required')])
  nose = StringField('Nose', validators=[DataRequired(message='Description of wine aromatics is required')])
  palate = StringField('Palate', validators=[DataRequired(message='Description of the flavor profile is required')])
  thoughts = StringField('Additional Thoughts')
  love = BooleanField('Love?')
  submit = SubmitField("Submit")

  def __init__(self, *args, **kwargs):
    super(TastingForm, self).__init__(*args, **kwargs)
    years = ['NV'] + [str(year) for year in range(datetime.now().year, 1899, -1)]
    self.vintage.choices = [(year, year) for year in years]