:- initialization(init_boundries).

init_boundries :-
	min_value(year, MIN_YEAR),
	max_value(year, MAX_YEAR),
	
	min_value(num_votes, MIN_NUM_VOTES),
	max_value(num_votes, MAX_NUM_VOTES),
	
	min_value(runtime, MIN_RUNTIME),
	max_value(runtime, MAX_RUNTIME),
	
	assertz(min_rating(0.0)),
	assertz(max_rating(10.0)),
	
	assertz(min_year(MIN_YEAR)),
	assertz(max_year(MAX_YEAR)),
	
	assertz(min_num_votes(MIN_NUM_VOTES)),
	assertz(max_num_votes(MAX_NUM_VOTES)),
	
	assertz(min_runtime(MIN_RUNTIME)),
	assertz(max_runtime(MAX_RUNTIME)).
	

% Recommendation weights
w_runtime(1).
w_year(2).
w_num_votes(4).
w_rating(4).
w_genre(5).


% Jaccard‐index on two genre lists
genre_distance(G1, G2, Index):-
  intersection(G1, G2, I),
  union(G1, G2, U),
  length(I, Li), length(U, Lu),
  (Lu =:= 0 -> Index = 1; Index is 1 - Li / Lu).


% Compute the weighted distance of one title to the input
title_distance(T1, T2, Dist):-
	genre(T1, G1), genre(T2, G2),
	norm_abs_diff(T1, T2, year, min_year, max_year, Dy),
	norm_abs_diff(T1, T2, rating, min_rating, max_rating, Dr),
	norm_abs_diff(T1, T2, num_votes, min_num_votes, max_num_votes, Dn),
	norm_abs_diff(T1, T2, runtime, min_runtime, max_runtime, Drn),
	genre_distance(G1, G2, Dg),

	w_year(Yw), w_rating(Rw), w_genre(Gw), w_num_votes(Nw), w_runtime(RTw),
	Dist is Yw*Dy + Rw*Dr + Nw*Dn + Gw*Dg + RTw*Drn.
	

titles_distance(_,[],0).
titles_distance(Title, [Target | RestTarget], Dist) :-
	title_distance(Title, Target, D),
	titles_distance(Title, RestTarget, RestDist),
	Dist is D + RestDist.
	

% Collect and sort all movies by distance
suggest(TitleIds, SuggestionInfo):-
	findall(D-T,
            (title(T), \+ member(T, TitleIds), titles_distance(T, TitleIds, D)),
            Pairs
	),
	sort(Pairs, Sorted),
	pairs_values(Sorted, Ts),
	member(SuggestionId, Ts),
	title(SuggestionId, SuggestionInfo).