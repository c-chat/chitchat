from django.shortcuts import render
from django.http import HttpResponse
from User_test.models import tempuserbase


def user_test(request, **kwargs):
    if request.method == "GET":
        return HttpResponse(tempuserbase.objects.get(User_id=0))


def id_user_test(request, user_id):
    if request.method == "GET":
        return HttpResponse(tempuserbase.objects.get(User_id=user_id))
