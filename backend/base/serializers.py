from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product

class UserSerializer(serializers.ModelSerializer):
    #name = serializers.SerializerMethodField(read_only=True)
    #_id = serializers.SerializerMethodField(read_only=True)
    #isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User    
        fields = ['id', 'username', 'email']



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'