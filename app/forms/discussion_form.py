from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField
from wtforms.validators import DataRequired



class DiscussionForm(FlaskForm):

  comment = StringField("Comment", validators=[DataRequired(message="Comment is required")])
  submit = SubmitField("Submit")
