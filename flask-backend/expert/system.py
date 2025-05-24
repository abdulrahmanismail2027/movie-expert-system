import requests

from classes import TitleType, Genre, Criterion, Adult

_inf = 'inf'
_DEFAULT_LIMIT = 25
_PROLOG_SERVER = 'http://localhost:6000'
_QUERY = f'{_PROLOG_SERVER}/query'
_QUERY_ONCE = f'{_PROLOG_SERVER}/query-once'
_QUERIES = f'{_PROLOG_SERVER}/queries'
_truth = 'truth'


def _parse_result(r, var):
    res = [
            {
                **x[var],
                'adult': bool(x[var]['adult']),
                'genres': [g if not isinstance(g, list) else '-'.join(g) for g in x[var]['genres']]
            }
            for x in r
    ]

    unique_res = list(
        {
            r['titleId']: r for r in res
        }.values()
    )

    return {
        'titles': unique_res
    }


def _escape(s):
    return s.replace('\\', '\\\\').replace('"', '\\"').replace("'", "\\'")


def _query_once(q: str) -> dict:
    return requests.get(_QUERY_ONCE, params={'q': q}).json()


def _query(q: str, l: int) -> dict:
    return requests.get(_QUERY, params={'q': q, 'l': l}).json()


def find(title_type: TitleType | None = None, genres: list[Genre] | None = None,
         min_rating: float = 0.0, max_rating: float = 10.0,
         min_num_votes: int = 0, max_num_votes: int | None = None,
         min_year: int = 0, max_year: int | None = None,
         min_runtime: int = 0, max_runtime: int | None = None,
         adult: bool | None = None,
         criteria: list[Criterion] | None = None,
         limit: int | None = None) -> dict:
    title_type = TitleType.from_value(title_type)
    genres = [Genre(g) for g in genres] if genres else []
    max_num_votes = max_num_votes or _inf
    max_year = max_year or _inf
    max_runtime = max_runtime or _inf
    adult = Adult.from_value(adult)
    criteria = [Criterion(c) for c in criteria] if criteria else []
    limit = limit or _DEFAULT_LIMIT

    var = 'T'
    q = (
        f'find({title_type.value if isinstance(title_type, TitleType) else title_type},'
        f'{[g.value for g in genres]},'
        f'{min_rating},{max_rating},'
        f'{min_num_votes},{max_num_votes},'
        f'{min_runtime},{max_runtime},'
        f'{min_year},{max_year},'
        f'{adult.value},'
        f'{[c.value for c in criteria]},'
        f'{var}).'
    )

    r = _query(q, limit)

    return _parse_result(r, var)


def search(query: str, limit: int | None = None) -> dict:
    limit = limit or _DEFAULT_LIMIT

    var = 'T'
    q = f'search(\"{_escape(query)}\",{var}).'

    r = _query(q, limit)

    return _parse_result(r, var)


def suggest(title_ids: list[str], limit: int | None = None) -> dict:
    limit = limit or _DEFAULT_LIMIT

    var = 'T'
    q = f'suggest({title_ids},{var}).'

    r = _query(q, limit)

    return _parse_result(r, var)
