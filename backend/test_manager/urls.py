from test_manager.views import homepage
from django.urls import path

urlpatterns = [
    path("", homepage.as_view())
]
