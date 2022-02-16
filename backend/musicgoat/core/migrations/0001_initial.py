# Generated by Django 3.2.11 on 2022-02-14 13:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60, unique=True)),
                ('real_name', models.CharField(blank=True, max_length=80, unique=True)),
                ('image', models.ImageField(blank=True, upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='SocialMedia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40, unique=True)),
                ('link', models.URLField(help_text='Url link to social account.')),
                ('icon', models.CharField(blank=True, max_length=400)),
                ('artist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='social_media', to='core.artist')),
            ],
        ),
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('cover', models.URLField(blank=True, help_text='album cover image')),
                ('active', models.BooleanField(default=False)),
                ('is_featured', models.BooleanField(default=False, help_text='Whether album is current album thats out now.')),
                ('slug', models.SlugField(editable=False)),
                ('artist', models.ForeignKey(help_text='Name of the artists on Album', on_delete=django.db.models.deletion.CASCADE, to='core.artist')),
            ],
        ),
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('audio', models.FileField(blank=True, help_text="Song's audio url path", upload_to='audio')),
                ('track_number', models.PositiveIntegerField()),
                ('views', models.PositiveIntegerField(default=0)),
                ('duration', models.FloatField(blank=True)),
                ('album', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='songs', to='core.album')),
            ],
            options={
                'ordering': ['track_number', '-pk'],
                'unique_together': {('album', 'track_number')},
            },
        ),
    ]
