# Helpful commands for local development
PORT ?= 8000

node_modules: package.json
	npm install

server: venv
	venv/bin/python3 manage.py runserver 0.0.0.0:$(PORT)

js: node_modules
	npm start
