# myproject/urls.py
from django.contrib import admin
from django.urls import path, include
from myapp import views  # Import views from myapp

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('myapp.urls')), #This is the most important part.
    path('', views.home, name='home'),  # Add this line
]