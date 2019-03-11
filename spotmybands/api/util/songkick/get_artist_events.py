import json
import requests

from urllib.parse import urlencode

def get_artist_events(artist_name):
    keys = json.load(open('spotmybands/utils/keys.json'))
    params = {
        'apikey': keys['SongkickAPIKey'],
        'artist_name': artist_name,
    }
    url = 'https://api.songkick.com/api/3.0/events.json?{}'.format(urlencode(params))
    res = requests.get(url)
    res_data = json.loads(res.text)

    if res_data['resultsPage']['totalEntries'] == 0:
        return []

    artist_events = res_data['resultsPage']['results']['event']
    payload = []

    for event in artist_events:
        venue = {
            'name': event['venue']['displayName'],
        }

        if event['venue']['lat']:
            venue['latitude'] = event['venue']['lat']
            venue['longitude'] = event['venue']['lng']
        elif event.get('location') and event['location']['lat']:
            venue['latitude'] = event['location']['lat']
            venue['longitude'] = event['location']['lng']
        else:
            # If can't find location, skip this event
            continue

        payload.append({
            'id': event['id'],
            'artist': artist_name,
            'venue': venue,
            'date': event['start']['date'],
            'songkickURL': event['uri'],
            'name': event['displayName'],
        })
    
    return payload
    
