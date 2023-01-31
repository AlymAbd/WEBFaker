from django.contrib.auth.models import User
from django_filters import (FilterSet, AllValuesFilter, DateFilter, NumberFilter, BooleanFilter, CharFilter, )
from rest_framework import serializers
from allauth.socialaccount.models import SocialAccount


class UserFilter(FilterSet):
    class Meta:
        model = User
        fields = {
            'id': ['exact'],
            'username': ['contains'],
            'email': ['contains'],
            'is_staff': ['exact'],
            'is_active': ['exact'],
            'is_superuser': ['exact'],
            'date_joined': ['exact']
        }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'is_superuser', 'is_active', 'date_joined']


class SocialaccountSerializer(serializers.HyperlinkedModelSerializer):
    extra_data = serializers.JSONField()

    class Meta:
        model = SocialAccount
        fields = ['extra_data']
