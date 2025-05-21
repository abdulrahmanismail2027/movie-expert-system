title_metrics(Title, Year, Rating, NumVotes, Genres, Runtime) :-
	year(Title, Year),
	rating(Title, Rating),
	num_votes(Title, NumVotes),
	genre(Title, Genres),
	runtime(Title, Runtime).

% Get title id, year, rating, number of votes, and genres of one title
title(Title, Year, Rating, NumVotes, Genres, Runtime, TitleType, PrimaryTitle, OriginalTitle, Adult):-
	title_metrics(Title, Year, Rating, NumVotes, Genres, Runtime),
	title_type(Title, TitleType),
	primary_title(Title, PrimaryTitle),
	original_title(Title, OriginalTitle),
	(adult(Title) -> Adult = true; Adult = false).
	
	
