from enum import Enum


class Adult(Enum):
    TRUE = 'true'
    FALSE = 'false'
    NONE = '_'

    @staticmethod
    def from_value(value):
        if value not in TitleType.__members__:
            return Adult.NONE

        return Adult(value)


class TitleType(Enum):
    VIDEO = 'video'
    MOVIE = 'movie'
    SHORT = 'short'
    TV_MOVIE = 'tvMovie'
    TV_SHORT = 'tvShort'
    TV_MINI_SERIES = 'tvMiniSeries'
    TV_SERIES = 'tvSeries'
    TV_SPECIAL = 'tvSpecial'
    NONE = '_'

    @staticmethod
    def from_value(value):
        if value not in TitleType.__members__:
            return TitleType.NONE

        return TitleType(value)


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