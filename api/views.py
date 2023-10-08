from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    # return HttpResponse("Hello, world!")
    return render(request, "api/index.html")


def greet(request, name):
    # return HttpResponse(f"Hello {name.capitalize()}")
    return render(request, "api/greet.html", {
        "name": name.capitalize()
    })


def waitlist(request):
    return
