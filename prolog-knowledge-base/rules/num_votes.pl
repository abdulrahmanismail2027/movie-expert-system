num_votes_between(Title, Start, End):- num_votes(Title, NV), NV >= Start, NV =< End.
num_votes_less(Title, NumVotes):- num_votes(Title, NV), NV =< NumVotes.
num_votes_greater(Title, NumVotes):- num_votes(Title, NV), NV >= NumVotes.