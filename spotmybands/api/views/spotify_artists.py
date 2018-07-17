import base64
import json
import requests

from django.http import Http404, HttpResponse, JsonResponse
from django.views.generic import View


class SpotifyArtistSearchView(View):
    def post(self, request):
        params = json.loads(request.body.decode('utf8'))

        if not params.get('access_token') or not params.get('q'):
            raise Http404

        headers = {
            'Authorization': 'Bearer {}'.format(params['access_token'])
        }
        url = 'https://api.spotify.com/v1/search?type=artist&q={}'.format(params['q'])
        r = requests.get(url, headers=headers)
        response_data = json.loads(r.text)
        if not response_data.get('artists'):
            raise Http404
        return JsonResponse({'artists': response_data['artists']['items']})
