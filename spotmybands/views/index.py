import base64
import json
import requests

from django.shortcuts import render


def IndexView(request):
    keys = json.load(open('spotmybands/utils/keys.json'))

    # Authorize with Spotify
    b64Key = base64.b64encode('{}:{}'.format(keys['SpotifyClientID'], keys['SpotifyClientSecret']).encode())
    headers = {
        'Authorization': 'Basic {}'.format(b64Key.decode())
    }
    data = {
        'grant_type': 'client_credentials'
    }
    r = requests.post('https://accounts.spotify.com/api/token', headers=headers, data=data)
    access_token = None
    try:
        response_data = json.loads(r.text)
        access_token = response_data['access_token']
    except:
        pass

    appData = {
        'SpotifyClientID': keys['SpotifyClientID'],
        'SpotifyAccessToken': access_token,
        'google_maps_api_key': keys['GoogleMapsAPIKey'],
    }

    return render(request, 'index.html', {'appData': appData})
