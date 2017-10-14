all:
	truffle compile
	truffle migrate
	truffle exec eulercoin-runner/run.js
