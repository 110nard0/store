from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (CustomUserList, CustomUserRegister,
                    LoginView, ProductViewSet, WaitlistUserViewSet)
from . import views

router = DefaultRouter()
router.register(r'waitlist', WaitlistUserViewSet)
router.register(r'users', CustomUserList)
router.register(r'products', ProductViewSet)

app_name = "api"
urlpatterns = [
    path('', include(router.urls)),
    path('status/', views.stats, name='status'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', CustomUserRegister.as_view(), name='register'),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
