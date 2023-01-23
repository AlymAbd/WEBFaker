from django.urls import path, include
from api.v1.accounts import router

urlpatterns = [
    path('accounts/', include(router.urls)),
    path('auth/', include('allauth.urls')),
    path('faker/', include(('test_manager.api.v1.urls', 'api-v1-faker'))),
]
