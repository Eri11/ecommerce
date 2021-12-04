from django.shortcuts import render
from django.http import JsonResponse 
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer 

# Create your views here.
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
