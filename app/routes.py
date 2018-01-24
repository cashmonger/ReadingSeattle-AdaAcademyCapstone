from flask import render_template, request, flash, redirect, url_for, jsonify, json


from werkzeug.urls import url_parse

from app import app
from app.models import Checkout, Usage, Text
from app.forms import SearchForm

@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    searchform = SearchForm()

    if request.method == 'POST':
        cdata = []
        results = Text.query.filter(Text.creator.like('%' + searchform.author_last.data + '%'),Text.title.like('%' + searchform.search_terms.data + '%')).all()

        results_data = [
            {"year": 2008, 'BOOK':0, 'AUDIOBOOK':0, 'EBOOK':0, 'OTHER':0},
            {"year": 2009, 'BOOK':0, 'AUDIOBOOK':0, 'EBOOK':0, 'OTHER':0},
            {"year": 2010, 'BOOK':0, 'AUDIOBOOK':0, 'EBOOK':0, 'OTHER':0},
            {"year": 2011, 'BOOK':0, 'AUDIOBOOK':0, 'EBOOK':0, 'OTHER':0},
            {"year": 2012, 'BOOK':0, 'AUDIOBOOK':0, 'EBOOK':0, 'OTHER':0},
            {"year": 2013, 'BOOK':0, 'AUDIOBOOK':0, 'EBOOK':0, 'OTHER':0},
            {"year": 2014, 'BOOK':0, 'AUDIOBOOK':0, 'EBOOK':0, 'OTHER':0},
            {"year": 2015, 'BOOK':0, 'AUDIOBOOK':0, 'EBOOK':0, 'OTHER':0},
            {"year": 2016, 'BOOK':0, 'AUDIOBOOK':0, 'EBOOK':0, 'OTHER':0},
            {"year": 2017, 'BOOK':0, 'AUDIOBOOK':0, 'EBOOK':0, 'OTHER':0},
            ]

        for row in results:
            i = 0
            while i < 10:
                if row.checkoutyear == results_data[i]['year']:
                    if row.material == 'BOOK':
                        results_data[i]['BOOK'] += row.annualcount
                    elif row.material == 'AUDIOBOOK':
                        results_data[i]['AUDIOBOOK'] += row.annualcount
                    elif row.material == 'EBOOK':
                        results_data[i]['EBOOK'] += row.annualcount
                    else:
                        results_data[i]['OTHER'] += row.annualcount
                    i += 1
                    break
                else:
                    i += 1

        return render_template('index.html', text=results, data=results_data, form=searchform, cdata=cdata)

    return render_template('index.html', form=searchform )



@app.route('/display')
def display():
    searchform = SearchForm()
    checkouts = Checkout.query.all()
    checkouts_data = []
    # set up a json array for results
    for row in checkouts:
        checkouts_data.append({
        'date': row.date,
        'horizon': {"usage": row.horizon},
        'overdrive': {"usage": row.overdrive},
        'freegal': {"usage": row.freegal},
        'hoopla': {"usage": row.hoopla},
        'zinio': {"usage": row.zinio}
        })

    # return render_template('display.html', data=checkouts_data)
    return render_template('index.html', cdata=checkouts_data, form=searchform)
    # return render_template('display.html', data=checkouts_data)

# results = Text.query.filter(Text.title.like('%'x'%'')).first()
# results = Text.query.filter(Text.title.like(%searchform.search_terms.data%)).first()
# results = Text.query.filter(Text.title.like('%' + 'underground railroad' + '%')).all()
# a = Text.query.filter(Text.title.like('%' + 'anansi boys' + '%'))

# results = Text.query.filter(Text.annualcount >=searchform.search_terms.data).first()
# z = Checkout.query.filter(Checkout.freegal >= 0)
# @app.route('/results', methods=['GET', 'POST'])
# def results():
#     text = Text.query.get(23)
#     return render_template('results.html', text=text)
