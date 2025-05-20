all_types(Types):-
	findall(
		T,
		title_typle(_, T),
		All
	),
	remove_duplicates(All, Types).