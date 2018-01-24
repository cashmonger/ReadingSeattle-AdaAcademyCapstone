from app import app, db
from app.models import Checkout, Usage, Text

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Checkout': Checkout, 'Usage': Usage, 'Text': Text}
# when the flask shell command runs, this function is invoked and these items are returned
