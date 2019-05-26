try:
    import keys
except ImportError:
    raise Exception("A keys.py file is required to run this project")

import os

keys_dict = keys.__dict__

heroku_keys = [
    'DJANGO_SECRET_KEY',
    'GOOGLE_MAPS_API_KEY',
    'SONGKICK_API_KEY',
    'SPOTIFY_CLIENT_ID',
    'SPOTIFY_CLIENT_SECRET'
]

command = 'heroku config:set'
for key in heroku_keys:
    command = command + ' {}={}'.format(key, keys_dict[key])

os.system(command)
