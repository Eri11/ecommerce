#Creamos archivo

from django.urls import path
from . import views

#De aqui saldran nuestros rutas de URL
urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('products/', views.getProducts, name="products"),
    path('products/<str:pk>', views.getProduct, name="product"),
    
]