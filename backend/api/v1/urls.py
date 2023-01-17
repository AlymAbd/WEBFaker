from django.urls import path, include

urlpatterns = [
    path('auth/', include('allauth.urls')),
    path('faker/', include(('test_manager.api.v1.urls', 'api-v1-faker'))),
]
