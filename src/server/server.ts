import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as keys from '../../keys.json';

const PORT = 8000;

const app = express();
const IS_DEV = app.get('env') == 'development'

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const appData = JSON.stringify({
  keys: IS_DEV ? keys.dev : keys.prod,
}, null, 2)

app.get('/', (req, res) => {
  res.render('index', { appData });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
