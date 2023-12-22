from django.urls import path

from User_test.views import user_test, id_user_test

urlpatterns = [
    path('', user_test),
    path('<int:user_id>/', id_user_test)
]
