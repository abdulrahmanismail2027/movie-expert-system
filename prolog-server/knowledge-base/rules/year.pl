year_between(Title, Start, End):- year(Title, Y), Y >= Start, Y =< End.
year_before(Title, Year):- year(Title, Y), Y =< Year.
year_after(Title, Year):- year(Title, Y), Y >= Year.