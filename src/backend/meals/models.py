from djongo import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class CustomUser(AbstractUser):
    address = models.CharField(max_length=255)
    
    groups = models.ManyToManyField(
        Group, related_name="customuser_set", blank=True
    )
    
    user_permissions = models.ManyToManyField(
        Permission, related_name="customuser_permissions_set", blank=True
    )

class Meal(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()
    description = models.TextField()

class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    status = models.CharField(default="Pending", max_length=20)
