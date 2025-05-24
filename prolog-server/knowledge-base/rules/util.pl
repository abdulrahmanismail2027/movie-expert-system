% True if sublist is a Subset of List
subset([], _).
subset(Sublist, List) :-
    forall(member(E, Sublist), member(E, List)).
	
% Remove duplicates from a list
remove_duplicates([], []).
remove_duplicates([Head | Tail], Result) :-
    member(Head, Tail), !,
    remove_duplicates(Tail, Result).
remove_duplicates([Head | Tail], [Head | Result]) :-
    remove_duplicates(Tail, Result).
	

bet(Low, High, Value) :-
	Value >= Low,
	Value =< High.


abs_diff(X, Y, D) :-
	D is abs(X - Y).
	

max_value(Goal, Max) :-
    findall(X, call(Goal, _, X), List),
    max_list(List, Max).
	

min_value(Goal, Min) :-
    findall(X, call(Goal, _, X), List),
    min_list(List, Min).
	

norm_abs_diff(T1, T2, G, L, H, D) :-
	call(G, T1, X),
	call(G, T2, Y),
	call(L, Min),
	call(H, Max),
	abs_diff(X, Y, AD),
	D is AD / (Max - Min).
	
	
string_diff(S1, S2, D):-
	isub(S1, S2, S, [normalize(true), zero_to_one(true), substring_threshold(0)]),
	D is 1 - S.