from django.urls import path

from User_test.views import register, search_user, Login, change_info

urlpatterns = [
    path('register/', register),
    path('search/', search_user),
    path('login/', Login),
    path('Change_info/', change_info)
]
