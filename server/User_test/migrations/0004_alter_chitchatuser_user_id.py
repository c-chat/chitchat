# Generated by Django 4.2.7 on 2023-12-26 19:06

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('User_test', '0003_message_message_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chitchatuser',
            name='User_id',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, unique=True),
        ),
    ]
