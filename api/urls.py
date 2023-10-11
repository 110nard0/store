from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WaitlistUserViewSet

router = DefaultRouter()
router.register(r'waitlist', WaitlistUserViewSet)

app_name = "api"
urlpatterns = [
    path("", include(router.urls)),
]
