% Recommendation weights
w_year(1.0).
w_num_votes(0.1).
w_rating(3.0).
w_genre(100000).

% Classic title thresholds
classic_year_threshold(1990).
classic_rating_threshold(8).
classic_num_votes_threshold(1000000).


% Family title thresholds
family_rating_threshold(7.5).
family_num_votes_threshold(100000).

% New title thresholds
new_year_threshold(2025).
new_num_votes_threshold(10000).

% Get title id, year, rating, number of votes, and genres of one title
title(Title, Year, Rating, NumVotes, Genres):-
	year(Title, Year),
	rating(Title, Rating),
	num_votes(Title, NumVotes),
	genre(Title, Genres).


% Jaccard‐index on two genre lists
genre_distance(G1, G2, Index):-
  intersection(G1, G2, I),
  union(G1, G2, U),
  length(I, Li), length(U, Lu),
  (Lu =:= 0 -> Index = 1; Index is Li / Lu).


% Compute the weighted distance of one title to the input
title_distance(T1, T2, Dist):-
	
	title(T1, Y1, R1, N1, G1),
	title(T2, Y2, R2, N2, G2),
	T1 \= T2,

	abs_diff(Y1, Y2, Dy),
	abs_diff(R1, R2, Dr),
	abs_diff(N1, N2, Dn),
	genre_distance(G1, G2, Dg),

	w_year(Yw), w_rating(Rw), w_genre(Gw), w_num_votes(Nw),
	Dist is Yw*Dy + Rw*Dr + Nw*Dn + Gw*Dg.


% Collect and sort all movies by distance, then take Top N suggestions
suggest(Title, N, Suggestions):-
	findall(D-T,
            title_distance(T, Title, D),
            Pairs
	),
	sort(Pairs, Sorted),
	pairs_values(Sorted, Titles),
	length(Prefix, N),
	append(Prefix, _, Titles),
	Suggestions = Prefix.
	
	
classic(Title):-
	classic_year_threshold(CYT),
	classic_rating_threshold(CRT),
	classic_num_votes_threshold(CNVT),
	year_before(Title, CYT),
	rating_greater(Title, CRT),
	num_votes_greater(Title, CNVT).
	
	
family(Title):-
	family_rating_threshold(FRT),
	family_num_votes_threshold(FNVT),
	has_genres(Title, [comedy, family, adventure]),
	rating_greater(Title, FRT),
	num_votes_greater(Title, FNVT),
	\+ adult(Title).
	
new(Title):-
	new_year_threshold(NYT),
	new_num_votes_threshold(NNVT),
	year_after(Title, NYT),
	num_votes_greater(Title, NNVT).