has_genres(Title, Genres):-
	genre(Title, Gs),
	subset(Genres, Gs).
	
all_genres(Genres):-
	findall(
		G,
		(genre(_, List),
		 member(G, List)),
		All
	),
	remove_duplicates(All, Genres).