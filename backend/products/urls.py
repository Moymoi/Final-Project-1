from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('products/', views.getProducts, name='products'),
    path('products/<str:pk>/', views.getProduct, name='product'),
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('verify-otp/', views.verify_otp, name='verify-otp'),
    path('logout/', views.logout_user, name='logout'),
    path('profile/', views.get_user_profile, name='get-profile'),
    path('profile/update/', views.update_user_profile, name='update-profile'),
    path('2fa/enable/', views.enable_2fa, name='enable-2fa'),
    path('2fa/confirm/', views.confirm_2fa, name='confirm-2fa'),
    path('2fa/disable/', views.disable_2fa, name='disable-2fa'),
    path('2fa/test-code/', views.test_2fa_code, name='test-2fa-code'),
]