from flask_wtf import FlaskForm

from wtforms import StringField, SelectField, TextAreaField, BooleanField, SubmitField

from wtforms.validators import ValidationError, DataRequired, EqualTo, Length

from app.models import Checkout, Text

class SearchForm(FlaskForm):
    choices = [('Books', 'Books'),
                ('Music', 'Music'),
                ('Video', 'Video')]
    select_category = SelectField('Choose a Category: ', choices=choices)
    search_terms = StringField('Title:')
    author_last = StringField('Author\'s Last Name')
    submit = SubmitField('SEARCH')
