import json

from django.shortcuts import render


def IndexView(request):
    keys = json.load(open('spotmybands/utils/keys.json'))

    appData = {
        'SpotifyClientID': keys['SpotifyClientID']
    }

    return render(request, 'index.html', {'appData': appData})
