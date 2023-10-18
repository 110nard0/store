from django.contrib.auth import authenticate
from rest_framework import serializers
# from dj_rest_auth.registration.serializers import RegisterSerializer as DefaultRegisterSerializer

from .models import CustomUser, Product, WaitlistUser


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


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = []


class WaitlistUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitlistUser
        fields = ['id', 'name', 'email']


# Authentication utilities
# class CustomRegisterSerializer(DefaultRegisterSerializer):
#     username = None

#     class Meta:
#         model = CustomUser
#         fields = ('email', 'password')

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(read_only=True, required=False)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if email and password:
            user = authenticate(request=self.context.get(
                'request'), email=email, password=password)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError(
                        "User account is disabled.")
                data["user"] = user
            else:
                raise serializers.ValidationError(
                    "Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError(
                'Must include "email" and "password".')
        return data


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'category',
                  'type', 'size', 'price', 'description']
