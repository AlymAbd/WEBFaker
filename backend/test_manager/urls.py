from test_manager.views import homepage
from django.urls import path, include

urlpatterns = [
    path('', homepage.as_view()),
    path('api/v1/', include('test_manager.api.v1.urls')),
    # re_path(r'.*', homepage.as_view())
]
