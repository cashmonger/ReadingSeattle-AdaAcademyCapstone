from app import db

class Checkout(db.Model):
    __table__ = db.Model.metadata.tables['checkout']

    def __init__(self, date, horizon):
        self.date = date
        self.horizon = horizon
        self.overdrive = overdrive
        self.freegal = freegal
        self.hoopla = hoopla
        self.zinio = zinio
# repr: tells python how to print items from this class

    def __repr__(self):
        return '<Checkout {}>'.format(self.date)
# this is where you can put methods related to this class
class Text(db.Model):
    __table__ = db.Model.metadata.tables['alltext']

    def __init__(self, title):
        self.system = system
        self.material = material
        self.checkoutyear = year
        self.title = title
        self.creator = creator
        self.subjects = subjects
        self.pubyear = pubyear
        self.annualcount = annualcount

    def __repr__(self):
        return '<Text {}>'.format(self.title, self.checkoutyear, self.annualcount, self.material)
