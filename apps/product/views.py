from django.shortcuts import render
from rest_framework.views import APIView
from .models import Product
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from apps.category.models import Category

# Create your views here.


class ProductListView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        data = self.request.data
        sortBy = data['sortBy']
        order = data['order']
        limit = data['limit']
        if not (sortBy == 'date_created', sortBy == 'sold', sortBy == 'price'):
            sortBy = 'date_created'
        if order == 'desc':
            sortBy = '-' + sortBy
            products = Product.objects.order_by(sortBy).all()[:int(limit)]
        elif order == 'asc':
            products = Product.objects.order_by(sortBy).all()[:int(limit)]
        else:
            products = Product.objects.order_by(sortBy).all()
        if products:
            products = ProductSerializer(products, many=True)
            return Response({'products': products.data}, status=status.HTTP_200_OK)
        else:
            return Response({'Error': 'No products found'}, status=status.HTTP_404_NOT_FOUND)
           

class ProductDetailView(APIView):
    def get(self, request, product_id, format=None):
        try:
            product_id = int(product_id)
        except:
            return Response({'Error': 'Product ID invalid. Product ID must be an integer'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            if Product.objects.filter(id = product_id).exists():
                product = Product.objects.get(id = product_id)
                product = ProductSerializer(product)
                return Response({'product': product.data}, status=status.HTTP_200_OK)
            return Response({'Error': 'No product found'}, status=status.HTTP_404_NOT_FOUND)
        
class ProductListCategoryView(APIView):
    def get(self ,request, category_id, format=None):
        try:
            category_id = int(category_id)
        except:
            return Response({'Error': 'Category ID invalid.Category ID must be an integer'})
        else:
            if Category.objects.filter(id = category_id).exists():
                category = Category.objects.get(id = category_id)
                if category.products.all().exists():
                    products = category.products.all()
                    products = ProductSerializer(products, many=True)
                    return Response({'products': products.data}, status=status.HTTP_200_OK)
                return Response({'Error': 'No products found'}, status=status.HTTP_404_NOT_FOUND)
            return Response({'Error': 'Category does not exist'}, status=status.HTTP_404_NOT_FOUND)


