from django.contrib.auth import logout, authenticate, login
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from rest_framework import generics, filters

from User_test.models import ChitChatUser
from User_test.forms import SignupForm, SearchForm, ChangeInfo


# from rest_framework.generics import CreateAPIView


def register(request, **kwargs):
    # return HttpResponse("Hi")
    # form = SignupForm()
    if request.method == "GET":
        form = SignupForm()
        return render(request, 'Register_test.html', {'form': form})

    if request.method == "POST":
        form = SignupForm(request.POST, False)

        if form.is_valid():
            new_user = ChitChatUser(username=form.cleaned_data['Username'],
                                    password=form.cleaned_data['Password'],
                                    fullname=form.cleaned_data['FullName'], bio=form.cleaned_data['bio'],
                                    loggedStatus=True,
                                    premiumStatus=False, premiumDaysLeft=0, blockList='', access=True)
            new_user.save()
            # group = Group.objects.all()

            messages.success(request, 'Account was created for ' + request.POST['Username'])
            return HttpResponse("Done!")
        return HttpResponse("not Done")


def Login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        if username and password:
            # check the password and username
            flag = ChitChatUser.objects.filter(username=username, password=password)
            print(type(flag))

            if flag is False:
                messages.info(request, 'Username OR password is incorrect')
            else:
                user = authenticate(request, username=username, password=password)

                if user is not None:
                    login(request, user)
                    print(user)
                    return HttpResponse('login success')
                ChitChatUser.objects.get(username=username)
                return HttpResponse()

        else:
            messages.info(request, 'Username OR password is incorrect')

    context = {}
    return render(request, 'Login_test.html', context)


def change_info(request):
    if request.method == "GET":
        form = ChangeInfo()
        return render(request, 'ChangeInfo_test.html', {'form': form})

    if request.method == "POST":
        form = SignupForm(request.POST, False)

        if form.is_valid():
            username = form.cleaned_data['Username']
            password = form.cleaned_data['Password']

            if username and password:
                # check the password and username
                flag = ChitChatUser.objects.filter(username=username, password=password)
                # print(type(flag))

                if flag is False:
                    messages.info(request, 'Username OR password is incorrect')
                else:

                    target_user = ChitChatUser.objects.get(username=username)
                    target_user.password = form.cleaned_data['New_Password']
                    target_user.fullname = form.cleaned_data['FullName']
                    target_user.bio = form.cleaned_data['bio']
                    target_user.save()

            # messages.success(request, 'Account was created for ' + request.POST['Username'])
                return HttpResponse("Done!")
        return HttpResponse("not Done")


def search_user(request, **kwargs):
    if request.method == "GET":
        form = SearchForm()
        return render(request, 'Search_test.html', {'form': form})

    if request.method == "POST":
        form = SearchForm(request.POST, False)

        if form.is_valid():
            user = ChitChatUser.objects.get(username=form.cleaned_data['Username'])
            return HttpResponse(user.User_id)


def logoutUser(request):
    logout(request)
    return redirect('login')
