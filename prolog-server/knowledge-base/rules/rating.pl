rating_between(Title, Start, End):- rating(Title, R), R >= Start, R =< End.
rating_less(Title, Rating):- rating(Title, R), R =< Rating.
rating_greater(Title, Rating):- rating(Title, R), R >= Rating.