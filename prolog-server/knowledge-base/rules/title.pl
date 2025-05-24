title(TitleId, TitleInfo) :-
    title(TitleId),
	primary_title(TitleId, PrimaryTitle),
    original_title(TitleId, OriginalTitle),
    title_type(TitleId, TitleType),
    genre(TitleId, Genre),
    rating(TitleId, Rating),
    num_votes(TitleId, NumVotes),
    runtime(TitleId, Runtime),
    year(TitleId, Year),
    adult(TitleId, Adult),
	TitleInfo = _{titleId: TitleId, primaryTitle: PrimaryTitle, originalTitle: OriginalTitle,
		   titleType: TitleType, genres: Genre, rating: Rating, numVotes: NumVotes,
		   runtime: Runtime, year: Year, adult: Adult}.