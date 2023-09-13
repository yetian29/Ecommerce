from django.shortcuts import render
from rest_framework.views import APIView
from .models import Product
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from apps.category.models import Category
from django.db.models import Q
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


class ProductBySearchView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        data = self.request.data
        category_id = data['category_id']
        price_range = data['price_range']
        sortBy = data['sortBy']
        order = data['order']

        try:
            category_id = int(category_id)
        except:
            return Response({'Error': 'Category ID invalid.Category ID must be an integer'})
        else:
            if Category.objects.filter(id = category_id).exists():
                category = Category.objects.get(id = category_id)
                if category.products.all().exists():
                    products = category.products.all()

                    if price_range == '1 - 19':
                        products = products.filter(price__gte = 1)
                        products = products.filter(price__lt = 20)
                    elif price_range == '20 - 39':
                        products = products.filter(price__gte = 20)
                        products = products.filter(price__lt = 40)
                    elif price_range == '40 - 59':
                        products = products.filter(price__gte = 40)
                        products = products.filter(price__lt = 60)
                    elif price_range == '60 - 79':
                        products = products.filter(price__gte = 60)
                        products =products.filter(price__lt = 80)
                    elif price_range == 'More than 80':
                        products = products.filter(price__gte = 80)
                    

                    if not (sortBy == 'date_created', sortBy == 'sold', sortBy == 'price'):
                         sortBy = 'date_created'
                    if order == 'desc':
                        sortBy = '-' + sortBy
                        products = products.order_by(sortBy)
                    elif order == 'asc':
                        products = products.order_by(sortBy)
                    else:
                        products = products.order_by(sortBy)
                    products = ProductSerializer(products, many=True)

                    return Response({'filtered_products': products.data}, status=status.HTTP_200_OK)
                return Response({'Error': 'No products found'}, status=status.HTTP_404_NOT_FOUND)
            return Response({'Error': 'No category found'}, status=status.HTTP_404_NOT_FOUND)
                       

class SearchView(APIView):
    def get(self, request, search_term, format=None):

        try:
            search_term = int(search_term)
        except:
            products = Product.objects.filter(
            Q(name__icontains=search_term) |
            Q(description__icontains=search_term) |
            Q(category__name__icontains=search_term) 

            )
            if products:
                products = ProductSerializer(products, many=True)
                return Response({'searched_products': products.data}, status=status.HTTP_200_OK)
            return Response({'Error': 'No products found'}, status=status.HTTP_404_NOT_FOUND)

        else:
            return Response({'Error': 'Search Term invalid. Search Term must be string'}, status=status.HTTP_400_BAD_REQUEST)
        

