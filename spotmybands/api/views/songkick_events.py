import base64
import json
import requests

from django.http import Http404, HttpResponse, JsonResponse
from django.views.generic import View

from spotmybands.api.util.songkick import get_artist_events


class SongkickEventsView(View):
    def get(self, request):
        params = request.GET
        if not params.get('artist_name'):
            raise Http404

        artist_events = get_artist_events(params['artist_name'])
        
        return JsonResponse({'artistEvents': artist_events})
