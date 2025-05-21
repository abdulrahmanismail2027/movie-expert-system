import json
import os

class Schema:
    def __init__(self):
        self.__SCHEMA_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'schema')
        self.__load_schemas()

    def __load_schemas(self):
        self.find_request = self.__load_schema('find_request')
        self.data_request = self.__load_schema('data_request')

    def __load_schema(self, filename):
        with open(os.path.join(self.__SCHEMA_DIR, f'{filename}.json'), 'r') as f:
            return json.load(f)