# from allauth.account.views import ConfirmEmailView
from django.urls import include, path, re_path
# from dj_rest_auth.registration.views import RegisterView as DefaultRegisterView, VerifyEmailView
# from dj_rest_auth.views import LoginView, LogoutView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# from .serializers import CustomRegisterSerializer
from .views import CustomUserRegister, CustomUserList, LoginView, WaitlistUserViewSet
from . import views

router = DefaultRouter()
router.register(r'waitlist', WaitlistUserViewSet)
router.register(r'users', CustomUserList)


app_name = "api"
urlpatterns = [
    path("", include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', CustomUserRegister.as_view(), name='register'),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # path('account-confirm-email/<str:key>/', ConfirmEmailView.as_view()),
    # path('register/', CustomRegisterView.as_view()),
    # path('login/', LoginView.as_view()),
    # path('logout/', LogoutView.as_view()),
    # path('verify-email/',
    #      VerifyEmailView.as_view(), name='rest_verify_email'),
    # path('account-confirm-email/',
    #      VerifyEmailView.as_view(), name='account_email_verification_sent'),
    # re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$',
    #         VerifyEmailView.as_view(), name='account_confirm_email'),
]
