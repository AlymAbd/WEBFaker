from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

FIELD_FORMAT_CHOICES = [
    ('fInteger', 'Integer'),
    ('fString', 'String'),
    ('fDatetime', 'Datetime'),
    ('fDate', 'Date'),
    ('fJson', 'Json'),
    ('fArray', 'Array'),
    ('fBool', 'Boolean'),
    ('fFloat', 'Float'),
    ('fRange', 'Range')
]

VALUE_TYPES = [
    ('faker', 'Faker'),
    ('python', 'Python'),
    ('own', 'Own value')
]

REQUEST_METHODS = [
    ('POST', 'POST'),
    ('GET', 'GET'),
    ('PUT', 'PUT'),
    ('DELETE', 'DELETE'),
    ('PATCH', 'PATCH')
]

BODY_TYPES = [
    ('JSON', 'JSON'),
    ('query', 'Query'),
    ('form_data', 'Form data')
]

EXPECT_CHOICES = [
    ('JSON', 'JSON'),
    ('str', 'String'),
    ('null', 'Nothing')
]


class Instances(models.Model):
    https = models.BooleanField(default=True)
    host = models.CharField(max_length=128)
    users = models.ManyToManyField(User)
    date_format = models.CharField(max_length=50, default='%Y-%m-%d')
    datetime_format = models.CharField(max_length=50, default='%Y-%m-%d %H:%M:%S')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Requests(models.Model):
    title = models.CharField(max_length=128)
    method = models.CharField(max_length=64, choices=REQUEST_METHODS, default='GET')
    headers = models.JSONField(null=True)
    body = models.CharField(max_length=128, null=True)
    body_type = models.CharField(max_length=128, choices=BODY_TYPES)
    expect = models.CharField(max_length=128, choices=EXPECT_CHOICES)
    iter_count = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(50)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class FieldTypes(models.Model):
    name = models.CharField(max_length=128)
    title = models.CharField(max_length=128)
    value_type = models.CharField(max_length=128, choices=VALUE_TYPES)
    _format = models.CharField(max_length=128, choices=FIELD_FORMAT_CHOICES, db_column='format')
    options = models.JSONField(null=True)

class Fields(models.Model):
    field_type = models.ForeignKey(FieldTypes, on_delete=models.CASCADE)
    title = models.CharField(max_length=128)
    is_active = models.BooleanField(default=True)
    value = models.TextField(null=True)
    option_parameters = models.JSONField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class RequestData(models.Model):
    request = models.ForeignKey(Requests, on_delete=models.CASCADE)
    field = models.ForeignKey(Fields, on_delete=models.CASCADE)
    parameter_name = models.CharField(max_length=128)
    value = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Results(models.Model):
    request = models.ForeignKey(Requests, on_delete=models.CASCADE)
    response = models.JSONField()
    status_code = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
