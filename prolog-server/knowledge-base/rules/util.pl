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
	
	
abs_diff(X, Y, D) :- D is abs(X - Y).

bet(Low, High, Value) :-
	Value >= Low,
	Value =< High.
