# Generated by Django 4.1.5 on 2023-01-16 15:44

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Fields',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128)),
                ('is_active', models.BooleanField(default=True)),
                ('value', models.TextField(null=True)),
                ('option_parameters', models.JSONField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='FieldTypes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('title', models.CharField(max_length=128)),
                ('value_type', models.CharField(choices=[('faker', 'Faker'), ('python', 'Python'), ('own', 'Own value')], max_length=128)),
                ('_format', models.CharField(choices=[('fInteger', 'Integer'), ('fString', 'String'), ('fDatetime', 'Datetime'), ('fDate', 'Date'), ('fJson', 'Json'), ('fArray', 'Array'), ('fBool', 'Boolean'), ('fFloat', 'Float'), ('fRange', 'Range')], db_column='format', max_length=128)),
                ('options', models.JSONField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Requests',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128)),
                ('method', models.CharField(choices=[('POST', 'POST'), ('GET', 'GET'), ('PUT', 'PUT'), ('DELETE', 'DELETE'), ('PATCH', 'PATCH')], default='GET', max_length=64)),
                ('headers', models.JSONField(null=True)),
                ('body', models.CharField(max_length=128, null=True)),
                ('body_type', models.CharField(choices=[('JSON', 'JSON'), ('query', 'Query'), ('form_data', 'Form data')], max_length=128)),
                ('expect', models.CharField(choices=[('JSON', 'JSON'), ('str', 'String'), ('null', 'Nothing')], max_length=128)),
                ('iter_count', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(50)])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Results',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('response', models.JSONField()),
                ('status_code', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('request', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='test_manager.requests')),
            ],
        ),
        migrations.CreateModel(
            name='RequestData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('parameter_name', models.CharField(max_length=128)),
                ('value', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('field', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='test_manager.fields')),
                ('request', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='test_manager.requests')),
            ],
        ),
        migrations.CreateModel(
            name='Instances',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('https', models.BooleanField(default=True)),
                ('host', models.CharField(max_length=128)),
                ('date_format', models.CharField(default='%Y-%m-%d', max_length=50)),
                ('datetime_format', models.CharField(default='%Y-%m-%d %H:%M:%S', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('users', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='fields',
            name='field_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='test_manager.fieldtypes'),
        ),
    ]
