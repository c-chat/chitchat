from django.db import models


# Create your models here.
class tempuserbase(models.Model):
    User_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return str(self.name)
