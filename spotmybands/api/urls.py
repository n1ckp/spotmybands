from django.conf.urls import url

from spotmybands.api import views

urlpatterns = [
    url(r'^spotify-auth/$', views.SpotifyAuthView.as_view()),
    url(r'^artist-search/$', views.SpotifyArtistSearchView.as_view()),
    url(r'^artist-events/$', views.SongkickEventsView.as_view()),
]
