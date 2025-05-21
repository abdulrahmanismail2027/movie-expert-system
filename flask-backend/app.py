from jsonschema import validate, ValidationError
from flask import Flask, request, jsonify
from flask_cors import CORS
import jsonschema_default as jd

from classes import TitleType, Genre, Criterion
from schema import Schema

from expert import System

app = Flask(__name__)
CORS(app)

schemas = Schema()
system = System()

@app.post('/find')
def find():
    r = request.get_json()

    try:
        validate(instance=r, schema=schemas.find_request)
    except ValidationError as e:
        return jsonify({
            'error': e.message,
            'path': list(e.path)
        }), 400

    jd.fill_from(schemas.find_request, r)
    params = {
        'title_type': TitleType(r['titleType']),
        'genres': [Genre(g) for g in r['genres']],
        'min_rating': r['minRating'],
        'max_rating': r['maxRating'],
        'min_num_votes': r['minNumVotes'],
        'max_num_votes': r['maxNumVotes'],
        'min_year': r['minYear'],
        'max_year': r['maxYear'],
        'min_runtime': r['minRuntime'],
        'max_runtime': r['maxRuntime'],
        'adult': r['adult'],
        'criteria': [Criterion(c) for c in r['criteria']],
        'limit': r['limit']
    }

    return jsonify(system.find(**params)), 200


@app.post('/data')
def data():
    r = request.get_json()

    try:
        validate(instance=r, schema=schemas.data_request)
    except ValidationError as e:
        return jsonify({
            'error': e.message,
            'path': list(e.path)
        }), 400

    return jsonify(system.data(r['titleId'])), 200


if __name__ == '__main__':
    app.run(debug=True, port=8080)