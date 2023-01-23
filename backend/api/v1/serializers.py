from django.contrib.auth.models import User
from rest_framework import serializers
from allauth.socialaccount.models import SocialAccount


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'is_superuser', 'is_active', 'date_joined']


class SocialaccountSerializer(serializers.HyperlinkedModelSerializer):
    extra_data = serializers.JSONField()

    class Meta:
        model = SocialAccount
        fields = ['extra_data']
