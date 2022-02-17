from core.api.views import (
    AlbumViewSet,
    ArtistViewSet,
    SocialMediaViewSet,
    SongViewSet,
    VideoViewSet,
)
from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from musicgoat.users.api.views import UserViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)
router.register("artists", ArtistViewSet, basename="artist")
router.register("socialmedia", SocialMediaViewSet, basename="socialmedia")
router.register("albums", AlbumViewSet, basename="album")
router.register("songs", SongViewSet, basename="song")
router.register("videos", VideoViewSet, basename="Video")


app_name = "api"
urlpatterns = router.urls
