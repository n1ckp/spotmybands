# Helpful commands for local development
PORT ?= 8000

node_modules: package.json
	npm install

server: venv
	DJANGO_ENV=DEV venv/bin/python3 manage.py runserver 0.0.0.0:$(PORT)

client: node_modules
	npm run dev
