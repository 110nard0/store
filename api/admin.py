from django.contrib import admin
from .models import (
    CustomUser, WaitlistUser, Product, Order,
    Preference, Category, Size, Colour
)


@admin.register(Preference)
class PreferenceAdmin(admin.ModelAdmin):
    list_display = ('preference',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category',)


@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display = ('sizename', 'sizevalue')


@admin.register(Colour)
class ColourAdmin(admin.ModelAdmin):
    list_display = ('colour', 'hex')


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email')
    list_filter = ('date_joined',)
    search_fields = ('first_name', 'last_name', 'email')
    ordering = ('-date_joined',)
    readonly_fields = ('date_joined', 'last_login')


class WaitlistUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email')
    list_filter = ('date_joined',)
    search_fields = ('name', 'email')
    ordering = ('-date_joined',)
    readonly_fields = ('date_joined',)


class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'category', 'size',
                    'colour', 'preference', 'stock', 'price', )
    list_filter = ('preference', 'category', 'size')
    search_fields = ('product', 'preference', 'category', 'size', 'colour')
    ordering = ('product',)
    readonly_fields = ('stock',)


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'cart', 'ordered_at', 'status',
                    'total_price_display', 'user_address')
    list_filter = ('status', 'ordered_at')
    search_fields = ('id', 'user__email', 'status')
    ordering = ('-ordered_at',)
    readonly_fields = ('id', 'ordered_at',
                       'total_price_display', 'user_address')

    def total_price_display(self, obj):
        return obj.total_price()
    total_price_display.short_description = 'Total Price'

    def user_address(self, obj):
        return obj.user.address
    user_address.short_description = 'User Address'


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(WaitlistUser, WaitlistUserAdmin)
