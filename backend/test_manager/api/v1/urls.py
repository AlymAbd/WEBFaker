from django.urls import path, include
from rest_framework import routers, viewsets
from test_manager.api.v1 import serializers
from test_manager import models
from rest_framework.permissions import IsAuthenticated


class InstanceViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.InstanceSerializer
    queryset = models.Instances.objects

    def get_queryset(self):
        self.queryset = models.Instances.objects.filter(user__id=self.request.user)
        return super().get_queryset()

    def perform_create(self, serializer):
        return super().perform_create(serializer)

class RequestsViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = models.Requests.objects.all()
    serializer_class = serializers.RequestsSerializer

class RequestDataViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = models.RequestData.objects.all()
    serializer_class = serializers.RequestDataSerializer

class FieldsViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = models.Fields.objects.all()
    serializer_class = serializers.FieldsSerializer

class FieldTypesViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = models.FieldTypes.objects.all()
    serializer_class = serializers.FieldTypesSerializer


router = routers.DefaultRouter()
router.register(r'instances', InstanceViewSet)
router.register(r'request', RequestsViewSet)
router.register(r'request_data', RequestDataViewSet)
router.register(r'fields', FieldsViewSet)
router.register(r'field_types', FieldTypesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
