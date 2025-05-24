% Classic title thresholds
classic_year_threshold(2000).
classic_rating_threshold(8).
classic_num_votes_threshold(1000000).

% Family title thresholds
family_rating_threshold(7.5).
family_num_votes_threshold(100000).

% New title thresholds
new_year_threshold(2025).
new_num_votes_threshold(10000).


classic(Title):-
	classic_year_threshold(CYT),
	classic_rating_threshold(CRT),
	classic_num_votes_threshold(CNVT),
	year_before(Title, CYT),
	rating_greater(Title, CRT),
	num_votes_greater(Title, CNVT).
	
family(Title):-
	family_num_votes_threshold(FNVT),
	has_genres(Title, [comedy, family]),
	num_votes_greater(Title, FNVT),
	\+ adult(Title).
	
new(Title):-
	new_year_threshold(NYT),
	new_num_votes_threshold(NNVT),
	year_after(Title, NYT),
	num_votes_greater(Title, NNVT).


find(TitleType, Genres, MinimumRating, MaximumRating, MinimumNumberVotes, MaximumNumberVotes,
     MinimumRuntime, MaximumRuntime, MinimumYear, MaximumYear, Adult, Criteria, TitleInfo) :-
	title(TitleId, TitleInfo),
	TitleInfo.titleType = TitleType,
	subset(Genres, TitleInfo.genres),
	bet(MinimumRating, MaximumRating, TitleInfo.rating),
	bet(MinimumNumberVotes, MaximumNumberVotes, TitleInfo.numVotes),
	bet(MinimumYear, MaximumYear, TitleInfo.year),
	bet(MinimumRuntime, MaximumRuntime, TitleInfo.runtime),
	TitleInfo.adult = Adult,
    forall(member(Criterion, Criteria), call(Criterion, TitleId)).