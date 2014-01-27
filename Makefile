test:
	@./node_modules/.bin/mocha test/*.js --require should --no-colors

lint:
	@./node_modules/.bin/jshint .

.PHONY: test lint