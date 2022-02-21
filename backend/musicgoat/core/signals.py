import logging
import re

import ffmpeg
from core.models import Song, Video
from django.db.models.signals import pre_save
from django.dispatch import receiver

logger = logging.getLogger(__name__)


@receiver(pre_save, sender=(Song))
def set_song_durations(sender, instance, **kwargs):

    # set filesize
    if instance.audio:
        try:
            metadata = ffmpeg.probe(instance.audio.path)["streams"][0]
            instance.duration = metadata["duration"]
            # instance.date_recorded = metadata["tags"]["creation_time"]
            # instance.filesize = os.path.getsize(instance.video)
        except IndexError:
            logger.exception("VideoMetaDataError")
        except:  # noqa
            pass


@receiver(pre_save, sender=Video)
def create_youtube_embeded_url(sender, instance, **kwargs):
    """Convert youtube video to validate embeded format"""

    youtube_url_names = ["youtube", "youtu.be"]
    youtube_video_id = None
    url = instance.url

    if any(x in url for x in youtube_url_names) and "embed" not in url:
        # Convert video's the url into youtube embed format
        try:
            youtube_video_id = re.match(r".*v\=(.*)", instance.url).group(1)
        except AttributeError:
            youtube_video_id = re.match(r".*/(.*)", instance.url).group(1)
        except:  # noqa
            pass

        if youtube_video_id:
            # Create the embed url
            instance.url = f"https://www.youtube.com/embed/{youtube_video_id}"
