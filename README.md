# SpotMyBands #

The place for quickly spotting events for the bands you listen to

---

### Local Development ###

You must first set keys for the project (not checked into this repo for obvious reasons)

## API keys ##

Two api key files are required, one for development (`<project root>/spotmybands/keys_dev.py`) and one for production (`<project root>/keys.py`) each containing the following:

```python
DJANGO_SECRET_KEY = '<key>'
GOOGLE_MAPS_API_KEY = "<key>"
SONGKICK_API_KEY = "<key>"
SPOTIFY_CLIENT_ID = "<key>"
SPOTIFY_CLIENT_SECRET = "<key>"
```

In order to set API keys as environment variables in your Heroku project for production, I've made a handy script. Simply run `python set_heroku_keys.py`

## Local Development ##

```
make server # Runs Django backend

make client # Runs webpack dev server for react app. Default port is 3000
```

## Deploying to Heroku ##

1. Ensure you have the Heroku CLI installed, and go to project root.
2. `heroku login`
2. `heroku create`
3. `heroku buildpacks:set heroku/python`
4. `heroku buildpacks:add heroku/nodejs`
5. `git push heroku master`
6. `heroku open`
