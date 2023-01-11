from test_manager.views import homepage
from django.urls import path, re_path

urlpatterns = [
    path('', homepage.as_view()),
    # re_path(r'.*', homepage.as_view())
]
