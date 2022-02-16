from core.models import Album, Artist, SocialMedia, Song
from rest_framework import serializers


class SocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedia
        fields = "__all__"


class ArtistSerializer(serializers.ModelSerializer):
    # socialmedia = SocialMediaSerializer(many=True, read_only=True)

    class Meta:
        model = Artist
        fields = "__all__"

    def to_representation(self, instance):
        fields = super().to_representation(instance)
        fields["socialmedia"] = instance.social_media.values("name", "icon", "link", "color")
        return fields


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = "__all__"


class AlbumSerializer(serializers.ModelSerializer):
    songs = SongSerializer(many=True, read_only=True)
    artist = ArtistSerializer(many=False, read_only=True)

    class Meta:
        model = Album
        fields = "__all__"

    def to_representation(self, instance):
        fields = super().to_representation(instance)
        fields["slug"] = instance.get_absolute_url()
        return fields
