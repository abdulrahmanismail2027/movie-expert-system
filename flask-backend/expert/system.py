import requests

from classes import TitleType, Genre, Criterion

inf = 'inf'
DEFAULT_LIMIT = 25
PROLOG_SERVER = 'http://localhost:5000'
QUERY = f'{PROLOG_SERVER}/query'
QUERY_ONCE = f'{PROLOG_SERVER}/query-once'

class System:
    @staticmethod
    def find(title_type: TitleType, genres: list[Genre],
             min_rating: float = 0.0, max_rating: float = 10.0,
             min_num_votes: int = 0, max_num_votes: int | str = inf,
             min_year: int = 0, max_year: int | str = inf,
             min_runtime: int = 0, max_runtime: int | str = inf,
             adult: bool | None = None,
             criteria: list[Criterion] | None = None,
             limit: int = DEFAULT_LIMIT) -> list[str]:

        if criteria is None:
            criteria = []

        if adult is None:
            adult = 'A'

        var = 'T'
        q = (
            f'find({var},{title_type.value},'
            f'{[g.value for g in genres]},'
            f'{min_rating},{max_rating},'
            f'{min_num_votes},{max_num_votes},'
            f'{min_year},{max_year},'
            f'{min_runtime},{max_runtime},'
            f'{adult},'
            f'{[c.value for c in criteria]}).'
        )

        r = requests.get(QUERY, params={'q': q, 'l': limit}).json()

        return list(map(lambda x: x[var], r))

    @staticmethod
    def data(title_id: str) -> dict | None:
        year = 'Year'
        rating = 'Rating'
        num_votes = 'NumVotes'
        runtime = 'Runtime'
        genres = 'Genres'
        title_type = 'TitleType'
        primary_title = 'PrimaryTitle'
        original_title = 'OriginalTitle'
        adult = 'Adult'
        truth = 'truth'
        q = (
            f'title({title_id},{year},'
            f'{rating},{num_votes},'
            f'{genres},{runtime},'
            f'{title_type},{primary_title},'
            f'{original_title},{adult}).'
        )

        r = requests.get(QUERY_ONCE, params={'q': q}).json()

        return {
            'title_id': title_id,
            'year': r[year],
            'rating': r[rating],
            'num_votes': r[num_votes],
            'genres': r[genres],
            'runtime': r[runtime],
            'title_type': r[title_type],
            'primary_title': r[primary_title],
            'original_title': r[original_title],
            'adult': r[truth]
        } if r[truth] else None