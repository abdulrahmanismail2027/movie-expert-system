all_title_types(Types):-
	findall(
		T,
		title_type(_, T),
		All
	),
	remove_duplicates(All, Types).