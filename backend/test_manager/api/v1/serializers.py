from django.contrib.auth.models import User
from rest_framework import serializers
from test_manager import models
from api.v1.serializers import UserSerializer


class InstanceSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)
    class Meta:
        model = models.Instances
        fields = '__all__'

class RequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Requests
        fields = ['title', 'method', 'headers', 'body', 'body_type', 'expect', 'iter_count']

class FieldTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FieldTypes
        fields = ['name', 'title', 'value_type', '_format', 'options']

class FieldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Fields
        fields = ['field_type', 'title', 'is_active', 'value', 'option_parameters']

class RequestDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RequestData
        fields = ['request', 'field', 'parameter_name', 'value']

class ResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Results
        fields = ['request', 'response', 'status_code']
