from django.conf.urls import patterns, include, url
from django.contrib import admin

from players.views import (
    PlayersAPIView,
    PlayersPageView,
    PlayersJSPageView,
)

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'mysite.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/v1/players.json', PlayersAPIView.as_view()),
    url(r'^pages/playersjs', PlayersJSPageView.as_view()),
    url(r'^pages/players', PlayersPageView.as_view()),
)