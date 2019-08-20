#!/usr/bin/env python
# encoding: utf-8

from __future__ import print_function

from main.pairwisepy import AllPairs


parameters = [
    ("Field 1",["min","regular" ,"max"]),
    ("Field 2",["A", "B", "C", "D"]),
    ("Field 3",["min", "regular", "max"]),
    ("Field 4",["true", "false"])
]

pairwise = AllPairs(
    [x[1] for x in parameters],
    filter_func=lambda values: [x[0] for x in parameters]
)

print("PAIRWISE:")
print(" #", end="  ")
for field in parameters:
    print("{}".format(field[0]), end=" ")
print()
for i, pairs in enumerate(pairwise):
    print("{:2d}: {}".format(i, pairs))