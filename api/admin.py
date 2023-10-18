from django.contrib import admin
from .models import CustomUser, Product, WaitlistUser


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email')


class WaitlistUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email',)


class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'price')


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(WaitlistUser, WaitlistUserAdmin)
