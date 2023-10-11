# from django.http import HttpResponse
# from django.shortcuts import render
from rest_framework import mixins, viewsets

from .models import WaitlistUser
from .serializers import WaitlistUserSerializer


# def register(request):
#     return render(request, "api/waitlist.html")


class WaitlistUserViewSet(mixins.CreateModelMixin,
                          mixins.ListModelMixin,
                          mixins.RetrieveModelMixin,
                          viewsets.GenericViewSet):
    queryset = WaitlistUser.objects.all()
    serializer_class = WaitlistUserSerializer
