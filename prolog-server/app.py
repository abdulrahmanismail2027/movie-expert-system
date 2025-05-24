import os

from flask import Flask, request, jsonify
from flask_cors import CORS
import janus_swi as j
import itertools as i
import logging

app = Flask(__name__)
CORS(app)
logger = logging.getLogger('PROLOG-SERVER')

inf = 'inf'
DEFAULT_LIMIT = 25
PROLOG_DIR = 'knowledge-base'
FACTS_DIR = os.path.join(PROLOG_DIR, 'facts')
RULES_DIR = os.path.join(PROLOG_DIR, 'rules')

FACTS = [
    'adult',
    'genre',
    'num_votes',
    'primary_title',
    'original_title',
    'rating',
    'runtime',
    'title',
    'title_type',
    'year',
]

RULES =[
    'util',
    'adult',
    'genre',
    'rating',
    'year',
    'num_votes',
    'title_type',
    'find',
    'search',
    'suggest',
    'title'
]

def consult(filepaths: list[str]):
    for filepath in filepaths:
        logger.info(f'Consult {filepath}')
        j.consult(filepath)


def init():
    logging.basicConfig(level=logging.INFO)

    facts = [os.path.join(FACTS_DIR, f'{fact_filename}.pl')
                    for fact_filename in FACTS]
    rules = [os.path.join(RULES_DIR, f'{rule_filename}.pl')
                    for rule_filename in RULES]
    consult(facts)
    consult(rules)

@app.get('/query')
def query():
    q = request.args.get('q')
    l = request.args.get('l', type=int)

    try:
        s = j.query(q)
    except j.PrologError as e:
        return jsonify({
            'error': e.message
        }), 400

    return jsonify(list(i.islice(s, l))), 200


@app.get('/query-once')
def query_once():
    q = request.args.get('q')

    try:
        s = j.query_once(q)
    except j.PrologError as e:
        return jsonify({
            'error': e.message
        }), 400

    return jsonify(s), 200


@app.post('/queries')
def queries():
    qs = request.get_json()
    s = []
    try:
        for q in qs:
            s.append(j.query_once(q))
    except j.PrologError as e:
        return jsonify({
            'error': e.message
        }), 400

    return jsonify(s), 200


if __name__ == '__main__':
    init()
    app.run(debug=True, port=6000, use_reloader=False)


