from re import A
from django.contrib.auth.models import User, update_last_login
from django.shortcuts import render
from django.http import JsonResponse 
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer, UserSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data['username'] = self.user.username
        data['email'] = self.user.email

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    #Creamos rutas -provisionales-
    routes = [
        '/api/products/',
        '/api/products/create/',

        '/api/products/upload/',

        '/api/products/<id>/reviews',

        '/api/products/top',

        '/api/products/<id>',

        '/api/products/delete/<id>/',
        '/api/products/<update>/<id>',
    ]   

    return Response(routes)


@api_view(['GET'])
def getUserProfile(request):   
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

#Crear vista para ver los productos de base de datos (sqlite)
@api_view(['GET'])
def getProducts(request):   
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

#Vista para obtener 1 producto
@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
