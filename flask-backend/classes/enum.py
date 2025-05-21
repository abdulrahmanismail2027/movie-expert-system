from enum import Enum


class TitleType(Enum):
    TV_SERIES = 'tvSeries'
    MOVIE = 'movie'

class Genre(Enum):
    FILM_NOIR = 'film-noir'
    WESTERN = 'western'
    MUSICAL = 'musical'
    SPORT = 'sport'
    GAME_SHOW = 'game-show'
    NEWS = 'news'
    MUSIC = 'music'
    ADULT = 'adult'
    HORROR = 'horror'
    TALK_SHOW = 'talk-show'
    SCI_FI = 'sci-fi'
    MYSTERY = 'mystery'
    ANIMATION = 'animation'
    CRIME = 'crime'
    REALITY_TV = 'reality-tv'
    ACTION = 'action'
    BIOGRAPHY = 'biography'
    DOCUMENTARY = 'documentary'
    FANTASY = 'fantasy'
    ROMANCE = 'romance'
    THRILLER = 'thriller'
    FAMILY = 'family'
    ADVENTURE = 'adventure'
    HISTORY = 'history'
    WAR = 'war'
    SHORT = 'short'
    COMEDY = 'comedy'
    DRAMA = 'drama'

class Criterion(Enum):
    FAMILY = 'family'
    CLASSIC = 'classic'
    NEW = 'new'