from django.urls import path
from base.views import order_views as views



#De aqui saldran nuestros rutas de URL
urlpatterns = [
    path('add/', views.addOrderItems, name='orders-add'),
    path('<str:pk>/', views.getOrderById, name='user-order'),
    
    
]