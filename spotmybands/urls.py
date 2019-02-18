from django.contrib import admin
from django.urls import path, re_path
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static

from spotmybands import views

urlpatterns = [
    url(r'api/', include('spotmybands.api.urls')),
    re_path(r'^$', views.IndexView, name='index'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_DIR)
