run:
	bin/gendiff.js

install:
	npm ci

publish:
	npm publish --dry-run

test:
	npm test

test-coverage:
	npm run test-coverage

lint:
	npx eslint .
