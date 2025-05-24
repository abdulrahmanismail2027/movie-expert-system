import jsonschema_default as jd
from flask import Flask, request, jsonify
from flask_cors import CORS
from jsonschema import ValidationError

import expert
from schema import Schema, get_validator, get_schema

app = Flask(__name__)
CORS(app)


def handle_request(request_schema, response_schema, call_fn, build_params_fn=None):
    r = request.get_json()

    try:
        get_validator(request_schema).validate(r)
    except ValidationError as e:
        return jsonify({'error': e.message, 'path': list(e.path)}), 400

    jd.fill_from(get_schema(request_schema), r)

    params = build_params_fn(r) if build_params_fn else r
    result = call_fn(**params)

    try:
        get_validator(response_schema).validate(result)
    except ValidationError as e:
        return jsonify({'error': e.message, 'path': list(e.path)}), 400

    return jsonify(result), 200


@app.post('/find')
def find():
    return handle_request(
        Schema.FIND_REQUEST,
        Schema.FIND_RESPONSE,
        expert.find,
        lambda r: {
            'title_type': r['titleType'],
            'genres': r['genres'],
            'min_rating': r['minRating'],
            'max_rating': r['maxRating'],
            'min_num_votes': r['minNumVotes'],
            'max_num_votes': r['maxNumVotes'],
            'min_year': r['minYear'],
            'max_year': r['maxYear'],
            'min_runtime': r['minRuntime'],
            'max_runtime': r['maxRuntime'],
            'adult': r['adult'],
            'criteria': r['criteria'],
            'limit': r['limit']
        }
    )


@app.post('/search')
def search():
    return handle_request(
        Schema.SEARCH_REQUEST,
        Schema.SEARCH_RESPONSE,
        expert.search
    )


@app.post('/suggest')
def suggest():
    return handle_request(
        Schema.SUGGEST_REQUEST,
        Schema.SUGGEST_RESPONSE,
        expert.suggest,
        lambda r: {
            'title_ids': r['titleIds'],
            'limit': r['limit']
        }
    )


if __name__ == '__main__':
    app.run(debug=True, port=8080)
