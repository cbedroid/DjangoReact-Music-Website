import logging

import ffmpeg
from core.models import Song
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
