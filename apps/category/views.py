from django.shortcuts import render
from rest_framework.views import APIView
from .models import Category
from .serializers import CategorySerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.


class CategoryListView(APIView):
    def get(self, request, format=None):
        if Category.objects.all().exists():
            categories = Category.objects.all()
            categories = CategorySerializer(categories, many=True)
            return Response({'categories': categories.data}, status=status.HTTP_200_OK)
        return Response({'Error': 'No categories found'}, status=status.HTTP_404_NOT_FOUND)
    
