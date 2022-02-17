from core.models import Album, Artist, SocialMedia, Song, Video
from django.contrib import admin
from django.templatetags.static import static
from django.utils.html import mark_safe

# Register your models here.


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    model = Artist

    def artist_image(self, obj):
        image_url = getattr(obj.image, "url", static("assets/images/noimage_user.jpg"))
        print("\nImage Url", image_url)
        return mark_safe(f'<img src="{image_url}" alt={obj} height="75" width="75">')

    list_display = ["name", "artist_image"]


class SongInline(admin.StackedInline):
    model = Song


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    model = Album
    inlines = [SongInline]
    list_display = ["name", "total_songs", "active", "is_featured"]

    def total_songs(self, obj):
        return obj.songs.count()


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    model = Video


@admin.register(SocialMedia)
class SocialMediaAdmin(admin.ModelAdmin):
    model = SocialMedia
