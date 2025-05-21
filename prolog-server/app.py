import os

from flask import Flask, request, jsonify
from flask_cors import CORS
import janus_swi as j
import itertools as i
import logging

app = Flask(__name__)
logger = logging.getLogger('PROLOG-SERVER')

inf = 'inf'
DEFAULT_LIMIT = 25
PROLOG_DIR = 'knowledge-base'
FACTS_DIR = os.path.join(PROLOG_DIR, 'facts')
RULES_DIR = os.path.join(PROLOG_DIR, 'rules')


def consult(filepaths: list[str]):
    for filepath in filepaths:
        logger.info(f'Consult {filepath}')
        j.consult(filepath)

def init():
    logging.basicConfig(level=logging.INFO)

    facts = [os.path.join(FACTS_DIR, fact_filename)
                    for fact_filename in os.listdir(FACTS_DIR)]
    rules = [os.path.join(RULES_DIR, rule_filename)
                    for rule_filename in os.listdir(RULES_DIR)]
    consult(rules)
    consult(facts)

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


if __name__ == '__main__':
    init()
    CORS(app)
    app.run(debug=True, port=5000, use_reloader=False)

