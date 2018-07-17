import base64
import json
import requests

from django.http import HttpResponse, JsonResponse
from django.views.generic import View


class SpotifyAuthView(View):
    def get(self, request):
        keys = json.load(open('spotmybands/utils/keys.json'))
        b64Key = base64.b64encode('{}:{}'.format(keys['SpotifyClientID'], keys['SpotifyClientSecret']).encode())
        headers = {
            'Authorization': 'Basic {}'.format(b64Key.decode())
        }
        data = {
            'grant_type': 'client_credentials'
        }
        r = requests.post('https://accounts.spotify.com/api/token', headers=headers, data=data)
        try:
            response_data = json.loads(r.text)
            access_token = response_data['access_token']
        except:
            pass
        return JsonResponse({'access_token': access_token})
