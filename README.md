# SpotMyBands 🎸

**[spotmybands.n1ck.dev](https://spotmybands.n1ck.dev/)**

The place for quickly spotting events for the bands you listen to.



Uses [Spotify](https://developer.spotify.com/) and [Songkick](https://www.songkick.com/developer) developer APIs.

Express for backend, React for frontend.

---

## Local Development

### 1. Obtain and set API keys

- Go to https://developer.spotify.com/ and obtain Client ID and Client Secret API keys.
- Go to https://www.songkick.com/developer and obtain an API key.
- Add a `keys.json` file at `/src/server/keys.json` in the following format:

```json
{
  "prod": {
    "SONGKICK_API_KEY": "<key>",
    "SPOTIFY_CLIENT_ID": "<key>",
    "SPOTIFY_CLIENT_SECRET": "<key>"
  },
  "dev": {
    "SONGKICK_API_KEY": "<key>",
    "SPOTIFY_CLIENT_ID": "<key>",
    "SPOTIFY_CLIENT_SECRET": "<key>"
  }
}
```

- In order to set API keys as environment variables in your Heroku project for production, I've made a handy script. Simply run `npm run heroku:setkeys`

### 2. Run server and client in separate terminal processes

```
make server # Runs Express server backend

make client # Runs webpack dev server for React app.
```

And you're away 🚀

## Deploying to Heroku

1. Ensure you have a Heroku account and the Heroku CLI installed, then go to project root.
2. `heroku login`
2. `heroku create`
3. `heroku buildpacks:set heroku/nodejs`
5. `git push heroku master`
6. `heroku open` to see your deployed dyno
