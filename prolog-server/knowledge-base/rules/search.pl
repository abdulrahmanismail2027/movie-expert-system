search(Query, TitleInfo):-
	findall(D-T,
			(primary_title(T, PT), string_diff(Query, PT, D)),
			DTs),
	sort(DTs, Sorted),
	pairs_values(Sorted, Ts),
	member(TitleId, Ts),
	title(TitleId, TitleInfo).