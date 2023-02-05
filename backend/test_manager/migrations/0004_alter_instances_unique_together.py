# Generated by Django 4.1.5 on 2023-02-03 15:53

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('test_manager', '0003_rename_users_instances_user'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='instances',
            unique_together={('https', 'host', 'user')},
        ),
    ]