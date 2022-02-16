import logging

from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

logger = logging.getLogger(__name__)
# Create your models here.


class Artist(models.Model):
    name = models.CharField(max_length=60, unique=True)
    real_name = models.CharField(max_length=80, blank=True, unique=True)
    image = models.ImageField(blank=True)

    def __str__(self):
        return self.name


class SocialMedia(models.Model):
    name = models.CharField(max_length=40, unique=True)
    artist = models.ForeignKey(Artist, related_name="social_media", on_delete=models.CASCADE)
    link = models.URLField(help_text=_("Url link to social account."))
    icon = models.CharField(blank=True, max_length=400)
    color = models.CharField(max_length=20, default="#000", help_text=_("icon color"))

    def __str__(self):
        return f"{self.artist} - {self.name}"


class Album(models.Model):
    name = models.CharField(max_length=200)
    cover = models.URLField(blank=True, help_text=_("album cover image"))
    artist = models.ForeignKey(Artist, help_text=_("Name of the artists on Album"), on_delete=models.CASCADE)
    active = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False, help_text=_("Whether album is current album thats out now."))
    slug = models.SlugField(editable=False)

    def get_absolute_url(self):
        return reverse("api:album-detail", kwargs={"pk": self.pk})

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.artist} - {self.name}"


class Song(models.Model):
    name = models.CharField(max_length=200)
    audio = models.FileField(blank=True, upload_to="audio", help_text=_("Song's audio url path"))
    track_number = models.PositiveIntegerField()
    views = models.PositiveIntegerField(default=0)
    duration = models.FloatField(blank=True)
    album = models.ForeignKey(
        Album,
        related_name="songs",
        blank=True,
        null=True,
        on_delete=models.CASCADE,
    )

    class Meta:
        ordering = ["track_number", "-pk"]
        unique_together = ["album", "track_number"]

    def get_absolute_url(self):
        return reverse("api:song-detail", kwargs={"pk": self.pk})

    def __str__(self):
        return self.name
