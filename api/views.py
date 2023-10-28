from django.contrib.auth import authenticate, login
from rest_framework import generics, mixins, status, views, viewsets
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


from .models import (
    CustomUser, Product, WaitlistUser
)

from .serializers import (
    CustomUserSerializer, LoginSerializer,
    ProductSerializer, WaitlistUserSerializer
)


class CustomUserRegister(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class CustomUserList(mixins.ListModelMixin,
                     viewsets.GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = CustomUser.objects.all()

        # Get identifier from request, it can be an 'id' or 'email'
        identifier = self.request.query_params.get('identifier', None)

        if identifier:
            # Try to filter by ID first
            try:
                id_value = int(identifier)
                queryset = queryset.filter(id=id_value)
            except ValueError:
                # If not an integer, filter by email
                queryset = queryset.filter(email=identifier)

        return queryset


class WaitlistUserViewSet(mixins.CreateModelMixin,
                          mixins.ListModelMixin,
                          viewsets.GenericViewSet):
    queryset = WaitlistUser.objects.all()
    serializer_class = WaitlistUserSerializer
    # permission_classes = [IsAdminUser]

    def get_queryset(self):
        queryset = WaitlistUser.objects.all()

        identifier = self.request.query_params.get('identifier', None)

        if identifier:
            try:
                id_value = int(identifier)
                queryset = queryset.filter(id=id_value)
            except ValueError:
                queryset = queryset.filter(email=identifier)

        return queryset

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        if WaitlistUser.objects.filter(email=email).exists():
            content = {"detail": "Email is already on the waitlist"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)


class LoginView(views.APIView):
    queryset = CustomUser.objects.all()
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = LoginSerializer(
            data=request.data, context={"request": request})
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            login(request, user)

            # Generate JWT or session
            refresh = RefreshToken.for_user(user)
            refresh_token = str(refresh)
            access_token = str(refresh.access_token)
            return Response({"access": access_token, "refresh": refresh_token}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]


# Status view

@api_view(['GET'])
def stats(request):
    return Response({"status": 'OK'}, status=status.HTTP_200_OK)
