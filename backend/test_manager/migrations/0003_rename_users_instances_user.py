# Generated by Django 4.1.5 on 2023-01-17 18:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('test_manager', '0002_remove_instances_users_instances_users'),
    ]

    operations = [
        migrations.RenameField(
            model_name='instances',
            old_name='users',
            new_name='user',
        ),
    ]
