from rest_framework import serializers
from .models import CustomUser, Product, WaitlistUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'date_joined',
                  'name', 'is_active', 'is_staff', 'is_waitlisted')
        # exclude = ('name', 'is_active', 'is_staff', 'is_superuser', 'is_waitlisted')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product


class WaitlistUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitlistUser
        fields = ['id', 'name', 'email']
