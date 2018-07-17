from django.conf.urls import url

from spotmybands.api import views

urlpatterns = [
    url(r'^spotify-auth/$', views.SpotifyAuthView.as_view()),
    url(r'artist-search/$', views.SpotifyArtistSearchView.as_view())
    # url(r'^activities/create/$', views.CreateActivityView.as_view()),
    # url(r'^activities/(?P<id>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/$', views.ActivityDataView.as_view()),
    # url(r'^activities/(?P<id>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/attendance-file/$', views.ActivityAttendanceView.as_view()),
    # url(r'^activities/(?P<id>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/allocation/$', views.ActivityAllocationView.as_view()),
    # url(r'^activities/status/(?P<operation>create|delete|hide|publish)/$', views.ActivityStatusView.as_view()),
]