runtime_between(Title, Start, End):- runtime(Title, RT), RT >= Start, RT =< End.
runtime_less(Title, Runtime):- runtime(Title, RT), RT =< Runtime.
runtime_greater(Title, Runtime):- runtime(Title, RT), RT >= Runtime.