#!/bin/bash
cd ./test
migration-manager a js && migration-manager a sql
ls
migration-manager e

mocha test.js --reporter spec

exit 0