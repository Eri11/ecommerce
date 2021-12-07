#Creamos archivo

from django.urls import path
from . import views



#De aqui saldran nuestros rutas de URL
urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  
    path('users/register/', views.registerUser, name='register'),

    path('users/profile/', views.getUserProfile, name="users-profile"),
    path('users/', views.getUsers, name="users"),

    path('products/', views.getProducts, name="products"),
    path('products/<str:pk>', views.getProduct, name="product"),
    
]