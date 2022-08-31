from flask_wtf import FlaskForm
from wtforms import SubmitField, TextAreaField
from wtforms.validators import DataRequired



class DiscussionForm(FlaskForm):

  comment = TextAreaField("Comment", validators=[DataRequired(message="Comment is required")])
  submit = SubmitField("Submit")
