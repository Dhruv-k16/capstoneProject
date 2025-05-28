from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path('customer/', views.customer_list, name='customer_list'),
    path('customer/<str:username>/', views.customer_detail, name='customer_detail'),
    path('customer/<str:username>/addresses/', views.customer_addresses),
    path('customer/<str:username>/delete-address/', views.delete_customer_address),
    path('customer/delete/<str:username>/', views.delete_customer, name='delete_customer'),

    path('api/customers/', views.customer_list),

    path('deliverymen/', views.deliveryman_list, name='deliveryman_list'),
    path('deliverymen/<str:pk>/', views.deliveryman_detail, name='deliveryman_detail'),  # use _id
    path('deliveryman/<str:username>/addresses/', views.deliveryman_addresses),
    path('deliveryman/<str:username>/delete-address/', views.delete_deliveryman_address),
    path('deliveryman/upload-document/', views.upload_deliveryman_document, name='upload_deliveryman_document'),
    path('deliverymen/delete/<str:username>/', views.delete_deliveryman_by_username),


    path('api/deliverymen/', views.deliveryman_list),

    path('homemaker/', views.homemaker_list, name='homemaker_list'),
    path('homemaker/<str:homemaker_id>/', views.homemaker_detail, name='homemaker_detail'),

    path('admins/', views.admin_list, name='admin_list'),
    path('admins/<str:username>/', views.admin_detail, name='admin_detail'),
    path('admin/change-password/', views.change_admin_password, name='change_admin_password'),


    path('orders/', views.order_list, name='order_list'),
    path('orders/<int:pk>/', views.order_detail, name='order_detail'),

    path('payments/', views.payment_list, name='payment_list'),
    path('payments/<str:pk>/', views.payment_detail, name='payment_detail'),

    path('login/<str:user_type>/', views.login, name='login'),
    path('forgot-password/<str:user_type>/', views.forgot_password, name='forgot_password'),
    path('verify-otp/<str:user_type>/', views.verify_otp, name='verify_otp'),

    path('submit-kitchen-details/', views.submit_kitchen_details, name='submit_kitchen_details'),
    path('admin/user-counts/', views.get_admin_user_counts, name='admin_user_counts'),
    path('admin/revenue-orders/', views.get_admin_revenue_orders, name='admin_revenue_orders'),
    path('admin/survey-counts/', views.get_admin_survey_counts, name='admin_survey_counts'),
    path('admin/profile/', views.admin_profile, name='admin_profile'),

    path('survey/', views.get_surveys, name='get_surveys'),
    path('survey/<str:survey_id>/', views.get_survey_detail, name='get_survey_detail'),
    path('survey/update/<str:survey_id>/', views.update_survey, name='update_survey'),
    path('survey/delete/<str:survey_id>/', views.delete_survey, name='delete_survey'),

    path('', views.home, name='home'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
