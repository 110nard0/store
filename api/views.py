# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.contrib.auth import login
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import ValidationError
# from django.http import Http404
# from django.views.generic import RedirectView
# from dj_rest_auth.registration.views import SocialLoginView
from rest_framework import generics, mixins, status, views, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
import urllib.parse


from .models import (
    Cart, CartItem, CustomUser,
    Order, Product, WaitlistUser,
    Category, Colour, Preference, Size
)

from .serializers import (
    CartItemSerializer,
    CustomTokenObtainPairSerializer, CustomUserSerializer,
    LoginSerializer, OrderSerializer,
    ProductSerializer, WaitlistUserSerializer,
    CategorySerializer, ColourSerializer,
    PreferenceSerializer, SizeSerializer
)

from .services import CustomExceptionHandlerMixin


# User views

class CustomUserRegister(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        if CustomUser.objects.filter(email=email).exists():
            return Response({"message": "Email is already registered"}, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)


class CustomUserList(mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     viewsets.GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = CustomUser.objects.all()

        # Get the identifier from the request, it can be 'id' or 'email'
        identifier = self.request.query_params.get('identifier', None)

        if identifier:
            # Try to filter by ID first
            try:
                queryset = queryset.filter(id=identifier)
            except ValidationError:
                # If it's not an integer, filter by email
                queryset = queryset.filter(email=identifier)

        return queryset


class WaitlistUserViewSet(mixins.CreateModelMixin, mixins.ListModelMixin,
                          mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = WaitlistUser.objects.all()
    serializer_class = WaitlistUserSerializer

    def get_queryset(self):
        queryset = WaitlistUser.objects.all()
        identifier = self.request.query_params.get('identifier', None)

        if identifier:
            try:
                queryset = queryset.filter(id=identifier)
            except ValidationError:
                queryset = queryset.filter(email=identifier)

        return queryset

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        if WaitlistUser.objects.filter(email=email).exists():
            return Response({"message": "Email is already on the waitlist"}, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)


# Auth views

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class LoginView(views.APIView):
    queryset = CustomUser.objects.all()
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = LoginSerializer(
            data=request.data, context={"request": request})
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            login(request, user)

            # Generate JWT for user session
            refresh = CustomTokenObtainPairSerializer.get_token(user)
            refresh_token = str(refresh)
            access_token = str(refresh.access_token)
            return Response({"access": access_token, "refresh": refresh_token}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class GoogleLoginView(SocialLoginView):
#     class GoogleAdapter(GoogleOAuth2Adapter):
#         access_token_url = "https://oauth2.googleapis.com/token"
#         authorize_url = "https://accounts.google.com/o/oauth2/v2/auth"
#         profile_url = "https://www.googleapis.com/oauth2/v2/userinfo"

#     adapter_class = GoogleAdapter
#     # callback_url = "http://127.0.0.1:8000/api/v1/code/"
#     callback_url = "http://127.0.0.1:8000/api/v1/status/"
#     client_class = OAuth2Client


# class UserRedirectView(LoginRequiredMixin, RedirectView):
#     permanent = False

#     def get_redirect_url(self):
#         return "redirect-url"


# @api_view(['GET'])
# def CodeView(request):
#     """
#     List all code snippets, or create a new snippet.
#     """
#     if request.method == 'GET':
#         code = urllib.parse.unquote(request.query_params['code'])
#         return Response({
#             "code": code,
#             "curl": "curl -H 'code " + code + "' http://127.0.0.1:8000/api/v1/authenticate/google/"})


# Product views

class ProductListView(viewsets.ReadOnlyModelViewSet):
    """
    Retrieve a read-only list of all products
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]


class ProductViewSet(CustomExceptionHandlerMixin, viewsets.ModelViewSet):
    """
    Retrieve, update or delete a product instance by ID.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]

    def get_object(self):
        return self.get_object_or_404(self.queryset, id=self.kwargs.get('pk'))


class OrderListCreateView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]


class OrderViewSet(CustomExceptionHandlerMixin, generics.RetrieveUpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUser]

    def get_object(self):
        return self.get_object_or_404(self.queryset, id=self.kwargs.get('pk'))


# Cart views

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    """
    Retrieve the contents of the authenticated user's shopping cart.

    This view returns the ID of the cart, a list of cart items, and the total number of items in the cart.

    Returns:
        dict: A dictionary containing cart details: cart_id, items, and total_items.
        For each item in the items list, the dictionary contains the product name, product price, 
        quantity, and the total price for that item.

    Raises:
        HTTP_404_NOT_FOUND: If no cart is found for the authenticated user.
    """
    cart, _ = Cart.objects.get_or_create(user=request.user)
    cart_items = cart.items.all()
    serializer = CartItemSerializer(cart_items, many=True)

    data = {
        'cart_id': cart.id,
        'user_id': cart.user.id,
        'items': serializer.data,
        'total_products': cart_items.count(),
        'total_price': cart.total_price()
    }

    return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    """
    Add a product to the authenticated user's cart.

    This view adds a specified product and quantity to the user's cart. If the product is already in the cart, 
    its quantity is increased by the specified quantity.

    Args:
        product_id (int): The ID of the product to be added.
        quantity (int, optional): The quantity of the product to be added. Defaults to 1.

    Returns:
        dict: A message indicating the success of the add operation.

    Raises:
        HTTP_404_NOT_FOUND: If the specified product is not found.
    """
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity')

    # product_id = request.form.get('product_id')
    # quantity = request.form.get('quantity')

    cart, _ = Cart.objects.get_or_create(user=request.user)
    cart_item, created = CartItem.objects.get_or_create(
        cart=cart, product_id=product_id, quantity=quantity)

    if not created:
        cart_item.quantity += int(quantity)
        cart_item.save()

    return Response({"message": "Item added to cart"}, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart(request, cart_item_id):
    """
    Update the quantity of a specific item in the authenticated user's cart.

    This view receives a cart item's ID and the new quantity, then updates the quantity of that item in the cart.

    Args:
        cart_item_id (int): The ID of the cart item to be updated.

    Returns:
        dict: A message indicating the success of the update operation.

    Raises:
        HTTP_404_NOT_FOUND: If the specified cart item is not found.
        HTTP_401_UNAUTHORIZED: If the cart item doesn't belong to the authenticated user.
    """
    quantity = request.data.get('quantity')

    try:
        cart_item = CartItem.objects.get(id=cart_item_id)
    except CartItem.DoesNotExist:
        return Response({"message": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

    if cart_item.cart.user != request.user:
        return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    cart_item.quantity = quantity
    cart_item.save()

    return Response({"message": "Cart updated"}, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_from_cart(request, cart_item_id):
    """
    Remove a specific item from the authenticated user's shopping cart.

    This view deletes a specified cart item from the user's cart.

    Args:
        cart_item_id (int): The ID of the cart item to be removed.

    Returns:
        dict: A message indicating the success of the removal operation.

    Raises:
        HTTP_404_NOT_FOUND: If the specified cart item is not found.
        HTTP_401_UNAUTHORIZED: If the cart item doesn't belong to the authenticated user.
    """
    try:
        cart_item = CartItem.objects.get(id=cart_item_id)
    except CartItem.DoesNotExist:
        return Response({"message": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

    if cart_item.cart.user != request.user:
        return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    cart_item.delete()
    return Response({"message": "Item removed from cart"}, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_cart(request):
    """
    Empty the contents of the authenticated user's shopping cart.

    This view deletes all cart items from the user's cart, essentially "emptying" it.

    Returns:
        dict: A message indicating the success of the deletion operation.

    Raises:
        HTTP_404_NOT_FOUND: If no cart is found for the authenticated user.
    """
    try:
        cart = Cart.objects.get(user=request.user)
    except Cart.DoesNotExist:
        return Response({"message": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)

    # cart.delete()
    cart.cartitem_set.all().delete()
    return Response({"message": "Cart emptied"}, status=status.HTTP_200_OK)


# Checkout views

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkout(request):
    cart = Cart.objects.get(user=request.user)
    Order.objects.create(user=request.user, cart=cart, status='pending')
    # Payment and other logic goes here

    return Response({"message": "Checkout successful"}, status=status.HTTP_201_CREATED)


# CMS views

class CategoryViewSet(CustomExceptionHandlerMixin, viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]

    def get_object(self):
        return self.get_object_or_404(self.queryset, id=self.kwargs.get('pk'))


class ColourViewSet(CustomExceptionHandlerMixin, viewsets.ModelViewSet):
    queryset = Colour.objects.all()
    serializer_class = ColourSerializer
    permission_classes = [IsAdminUser]

    def get_object(self):
        return self.get_object_or_404(self.queryset, id=self.kwargs.get('pk'))


class PreferenceViewSet(CustomExceptionHandlerMixin, viewsets.ModelViewSet):
    queryset = Preference.objects.all()
    serializer_class = PreferenceSerializer
    permission_classes = [IsAdminUser]

    def get_object(self):
        return self.get_object_or_404(self.queryset, id=self.kwargs.get('pk'))


class SizeViewSet(CustomExceptionHandlerMixin, viewsets.ModelViewSet):
    queryset = Size.objects.all()
    serializer_class = SizeSerializer
    permission_classes = [IsAdminUser]

    def get_object(self):
        return self.get_object_or_404(self.queryset, id=self.kwargs.get('pk'))


# Status view

@api_view(['GET'])
def stats(request):
    return Response({"status": 'OK'}, status=status.HTTP_200_OK)
