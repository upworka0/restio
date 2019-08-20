#!/usr/bin/env python
# encoding: utf-8

from __future__ import print_function

from pairwisepy import AllPairs

import json
import sys
import logging
import ast

parameters = ast.literal_eval(sys.argv[1])

pairwise = AllPairs(parameters)

results = {i:pairs for i, pairs in enumerate(pairwise)}
print(json.dumps(results))