NPM := npm
NPM_RUN := $(NPM) run

.PHONY: install
install:
	$(NPM) install

.PHONY: start
start:
	$(NPM_RUN) nx -- serve

.PHONY: build
build:
	NODE_ENV='production' $(NPM_RUN) nx -- build -c production
