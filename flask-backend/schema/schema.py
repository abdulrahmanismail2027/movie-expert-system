import json
import os
from enum import Enum

from jsonschema import RefResolver, Draft202012Validator

def _load_schema(filename):
    with open(os.path.join(_SCHEMA_DIR, f'{filename}.json'), 'r') as f:
        return json.load(f)

_SCHEMA_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'schema')

_title_schema = _load_schema('title')
_find_request = _load_schema('find_request')
_find_response = _load_schema('find_response')
_search_request = _load_schema('search_request')
_search_response = _load_schema('search_response')
_suggest_request = _load_schema('suggest_request')
_suggest_response = _load_schema('suggest_response')

_schema_store = {
    _title_schema['$id']: _title_schema,
    _find_request['$id']: _find_request,
    _find_response['$id']: _find_response,
    _search_request['$id']: _search_request,
    _search_response['$id']: _search_response,
    _suggest_request['$id']: _suggest_request,
    _suggest_response['$id']: _suggest_response,
}

class Schema(Enum):
    TITLE = _title_schema['$id']
    FIND_REQUEST = _find_request['$id']
    FIND_RESPONSE = _find_response['$id']
    SEARCH_REQUEST = _search_request['$id']
    SEARCH_RESPONSE = _search_response['$id']
    SUGGEST_REQUEST = _suggest_request['$id']
    SUGGEST_RESPONSE = _suggest_response['$id']


def get_schema(schema: Schema):
    return _schema_store[schema.value]


def get_validator(schema: Schema):
    schema_id = schema.value
    resolver = RefResolver(schema_id, _schema_store)
    return Draft202012Validator(_schema_store[schema_id], resolver=resolver)
