from django.db import models
from django.utils.translation import gettext_lazy as _


# Create your models here.
class ChitChatUser(models.Model):
    User_id = models.AutoField(primary_key=True)
    User_username = models.CharField(max_length=20, null=False, unique=True, default="")
    User_password = models.CharField(max_length=10, null=False, default="")
    User_fullname = models.CharField(max_length=20, unique=False)
    User_bio = models.CharField(max_length=100)
    User_photo = models.ImageField(default=None)
    User_loggedStatus = models.BooleanField(default=False, null=False)
    User_premiumStatus = models.BooleanField(default=False, null=False)
    User_premiumDaysLeft = models.IntegerField(null=False, default=0)
    User_lastSeen = models.DateTimeField(auto_now=True)
    blockList = models.TextField(null=True)


class Message(models.Model):
    Message_id = models.AutoField(primary_key=True)
    Message_sender = models.ForeignKey(to=ChitChatUser, on_delete=models.DO_NOTHING, null=False,
                                       related_name="sender_message_set", default='')
    Message_receiver = models.ForeignKey(to=ChitChatUser, on_delete=models.DO_NOTHING, null=False,
                                         related_name="receiver_message_set", default='')
    Message_text = models.CharField(max_length=500)
    Message_SendTime = models.DateTimeField(auto_now_add=True)
    Message_photo = models.ImageField()
    Message_Voice = models.FileField()
    Message_isEdited = models.BooleanField(default=False, null=False)
    Message_isForwarded = models.BooleanField(default=False, null=False)
    Message_originalSenderForwardCase = models.CharField(max_length=20)

    class Type(models.TextChoices):
        text = "text", _('text_message')
        photo = "photo", _("photo_message")
        voice = "voice", _('voice_message')

    Message_type = models.CharField(max_length=10, choices=Type.choices, default=Type.text)
