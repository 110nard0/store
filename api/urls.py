from django.urls import include, path, re_path
from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    # CodeView, GoogleLoginView,
    CustomTokenObtainPairView, LoginView,
    CustomUserList, CustomUserRegister,
    OrderListCreateView, OrderViewSet,
    ProductListView, ProductViewSet,
    WaitlistUserViewSet,
    # WaitlistUserViewSet, UserRedirectView,
    PreferenceViewSet, CategoryViewSet,
    ColourViewSet, SizeViewSet
)

from . import views

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'colours', ColourViewSet)
router.register(r'preferences', PreferenceViewSet)
router.register(r'products', ProductViewSet)
router.register(r'sizes', SizeViewSet)
router.register(r'users', CustomUserList)
router.register(r'waitlist', WaitlistUserViewSet)

app_name = "api"
urlpatterns = [
    path('', include(router.urls)),
    path('status/', views.stats, name='status'),

    # Sign up/Sign in routes
    path('login/', LoginView.as_view(), name='login'),
    path('register/', CustomUserRegister.as_view(), name='register'),

    # Auth routes
    # path('authenticate/google/', GoogleLoginView.as_view(), name='google_login'),
    # path("~redirect/", view=UserRedirectView.as_view(), name="redirect"),
    # path('code/', CodeView, name='code'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Product routes
    path('products/',
         ProductListView.as_view({'get': 'list'}), name='product-list'),

    # Cart routes
    path('cart/', views.view_cart, name='view-cart'),
    path('cart/add/', views.add_to_cart, name='add_to_cart'),
    path('cart/item/<uuid:cart_item_id>/',
         views.update_cart, name='update_cart'),
    path('cart/item/<uuid:cart_item_id>/delete/',
         views.delete_from_cart, name='delete_from_cart'),
    path('cart/delete/', views.delete_cart, name='delete_cart'),

    # Checkout routes
    path('orders/', OrderListCreateView.as_view(), name='order-user'),
    path('orders/<uuid:pk>/', OrderViewSet.as_view(), name='order-admin'),
    path('checkout/', views.checkout, name='checkout'),
]
