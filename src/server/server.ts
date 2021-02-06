import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import artistSearch from './routers/artistSearch';
import artistEvents from './routers/artistEvents';
import spotifyAuth from './spotifyAuth';
import { KEYS } from './utils';

const PORT = 8000;

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const accessTokenRes = await spotifyAuth();
  const appData = {
    keys: KEYS,
    accessToken: accessTokenRes.access_token,
  }
  const appDataString = JSON.stringify(appData, null, 2);
  console.log('appData', appData);
  res.render('index', { appData, appDataString });
});
app.post('/api/artist-search', artistSearch);
app.post('/api/artist-events', artistEvents);
app.post('/api/spotify-auth', spotifyAuth);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
