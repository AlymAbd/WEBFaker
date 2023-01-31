from django.contrib.auth.models import User
from rest_framework import routers, viewsets
from rest_framework.permissions import IsAuthenticated
from allauth.socialaccount.models import SocialAccount
from api.v1 import serializers


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    filter_class = serializers.UserFilter
    ordering_fields = '__all__'
    filterset_fields = '__all__'

class SocialaccountViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = SocialAccount.objects
    serializer_class = serializers.SocialaccountSerializer
    ordering_fields = '__all__'
    filterset_fields = '__all__'

    def get_queryset(self):
        self.queryset = self.queryset.filter(user=self.request.user)
        return super().get_queryset()

router = routers.DefaultRouter()
router.register(r'settings', SocialaccountViewSet)
router.register(r'users', UserViewSet)
