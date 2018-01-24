from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from instance.config import app_config

db = SQLAlchemy()

application = Flask(__name__)
#name = name of module in which name is called
application.config.from_object(app_config['development'])

db = SQLAlchemy(application)

db.Model.metadata.reflect(db.engine)




from app import routes, models
