test:
	@./node_modules/.bin/mocha test/*.js --reporter spec

test-watch:
	@./node_modules/.bin/mocha test/*.js --reporter spec --watch

lint:
	@./node_modules/.bin/jshint .

.PHONY: lint test test-watch