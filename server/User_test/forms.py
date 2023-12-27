from django import forms

from User_test.models import ChitChatUser


class SignupForm(forms.Form):
    Username = forms.CharField(max_length=20)
    Password = forms.CharField(max_length=10)
    FullName = forms.CharField(max_length=20)
    bio = forms.CharField(max_length=100)
    # photo = forms.ImageField()
    # class Meta:
    #     model = ChitChatUser
    #     fields = ["User_username", "User_password", "User_fullname", "User_bio", "User_photo"]


class SearchForm(forms.Form):
    Username = forms.CharField(max_length=20)


class ChangeInfo(forms.Form):
    Username = forms.CharField(max_length=20)
    Password = forms.CharField(max_length=10)
    New_Password = forms.CharField(max_length=10, required=False)
    FullName = forms.CharField(max_length=20, required=False, label='Full name')
    bio = forms.CharField(max_length=100, required=False)


    def clean_New_Password(self):
        New_Password = self.cleaned_data['New_Password']
        if New_Password is None or len(New_Password) < 5:
            message = "Password incorrect"
            raise forms.ValidationError(message)
        return New_Password


