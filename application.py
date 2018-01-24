from app import application, db
from app.models import Checkout, Usage, Text

@application.shell_context_processor
def make_shell_context():
    return {'db': db, 'Checkout': Checkout, 'Usage': Usage, 'Text': Text}
# when the flask shell command runs, this function is invoked and these items are returned
if __name__ == "__main__":
    application.run()
