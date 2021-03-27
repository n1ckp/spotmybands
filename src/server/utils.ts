export const IS_DEV = process.env.NODE_ENV !== "production";

type Keys = {
  GOOGLE_MAPS_API: string;
  SONGKICK_API_KEY: string;
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
};
type FileKeys = {
  dev: Keys;
  prod: Keys;
};

let keys: Keys;
try {
  const ks = require("./keys.json");
  console.log("keys.json found");
  keys = IS_DEV ? ks.dev : ks.prod;
} catch (err) {
  console.log("keys.json not found, looking at process.env");
  const {
    GOOGLE_MAPS_API,
    SONGKICK_API_KEY,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
  } = process.env as Keys;
  keys = {
    GOOGLE_MAPS_API,
    SONGKICK_API_KEY,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
  };
}

console.log("keys applied: ", keys);

export const KEYS = keys;
