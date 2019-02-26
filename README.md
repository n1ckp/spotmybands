# SpotMyBands #

The place for quickly spotting events for the bands you listen to

---

### Local Development ###

```
make api

make js # Default port is 3000
```

## API keys ##

Stored in `spotmybands/utils/keys.json`

## Deploying to Heroku ##

1. Ensure you have the Heroku CLI installed, and go to project root.
2. `heroku login`
2. `heroku create`
3. `heroku buildpacks:set heroku/python`
4. `heroku buildpacks:add heroku/nodejs`
5. `git push heroku master`
6. `heroku open`
