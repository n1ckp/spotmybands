import base64
import json
import requests

from django.shortcuts import render
from django.conf import settings


def IndexView(request):
    # Authorize with Spotify
    b64Key = base64.b64encode('{}:{}'.format(
        settings.SPOTIFY_CLIENT_ID, settings.SPOTIFY_CLIENT_SECRET).encode()
    )
    headers = {
        'Authorization': 'Basic {}'.format(b64Key.decode())
    }
    data = {
        'grant_type': 'client_credentials'
    }
    r = requests.post(
        'https://accounts.spotify.com/api/token', headers=headers, data=data
    )
    access_token = None
    try:
        response_data = json.loads(r.text)
        access_token = response_data['access_token']
    except:
        pass

    appData = {
        'SpotifyClientID': settings.SPOTIFY_CLIENT_ID,
        'SpotifyAccessToken': access_token,
        'GoogleMapsAPIKey': settings.GOOGLE_MAPS_API_KEY,
    }

    return render(request, 'index.html', {'appData': appData})
