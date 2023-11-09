from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed, NotFound, ParseError, PermissionDenied
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    CartItem, CustomUser,
    Order, Product, WaitlistUser,
    Category, Colour, Preference, Size
)


# User serializers

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name',
                  'email', 'preference', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = self.Meta.model(**validated_data)
        if password is not None:
            user.set_password(password)
        user.save()
        return user


class WaitlistUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitlistUser
        fields = ['id', 'name', 'email']


# Authentication serializers

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom token claims
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email
        token['phone_number'] = user.phone_number
        token['address'] = user.address
        token['lga'] = user.lga
        token['state'] = user.state
        token['preference'] = user.preference
        token['is_staff'] = user.is_staff

        return token


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(read_only=True, required=False)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if email and password:
            user = authenticate(request=self.context.get('request'),
                                email=email, password=password)
            if user:
                if not user.is_active:
                    raise NotFound({"message": "User account is disabled"})
                data["user"] = user
            else:
                raise ParseError({"message": "Invalid credentials"})
        else:
            raise ParseError(
                {"message": 'Must include "email" and "password"'})
        return data


# Shop serializers

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        # fields = '__all__'
        fields = ['id', 'product', 'description', 'price', 'stock', 'show',
                  'images', 'key', 'preference', 'category', 'size', 'colour']


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.product')
    product_price = serializers.ReadOnlyField(source='product.price')
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product_name',
                  'product_price', 'quantity', 'total_price']

    def get_total_price(self, obj):
        return obj.product.price * obj.quantity


class OrderSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'user', 'cart', 'ordered_at',
                  'status', 'total_price', 'address']

    def get_total_price(self, obj):
        return obj.total_price()

    def get_address(self, obj):
        return obj.address


# CMS serializers

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'category')


class ColourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colour
        fields = ('id', 'colour', 'hex')


class PreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preference
        fields = ('id', 'preference')


class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ('id', 'sizename', 'sizevalue')
