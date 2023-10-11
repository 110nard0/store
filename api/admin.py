from django.contrib import admin
from .models import CustomUser, WaitlistUser


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email')


class WaitlistUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email',)


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(WaitlistUser, WaitlistUserAdmin)
