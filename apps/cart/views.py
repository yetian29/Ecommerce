from django.shortcuts import render
from rest_framework.views import APIView
from .models import Cart, CartItem
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from apps.product.models import Product
from apps.product.serializers import  ProductSerializer

# Create your views here.




class GetItemsView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        try:
            Cart.objects.filter(user=user).exists()
        except:
            return Response({'Error': 'Your Account is not logged in'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            cart = Cart.objects.get(user=user)
            result = []
            cart_items = cart.cart_items.order_by('product').all()
            for cart_item in cart_items:
                item = {}
                item['id'] = cart_item.id
                item['count'] = cart_item.count
                product = Product.objects.get(id=cart_item.product.id)
                product = ProductSerializer(product)
                item['product'] = product.data
                result.append(item)

            return Response({'cart_items': result}, status=status.HTTP_200_OK)
  

class AddItemView(APIView):
    permission_classes=(permissions.AllowAny,)

    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data
        product_id = data['product_id']
        count = data['count']
        try:
            Cart.objects.filter(user=user).exists()
        except:
            return Response({'Error': 'Your Account is not logged in'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            cart = Cart.objects.get(user=user)
            try:
                product_id = int(product_id)
            except:
                return Response({'Error': 'Product ID invalid. Product ID must be an integer'})
            else:
                if Product.objects.filter(id=product_id).exists():
                    product = Product.objects.get(id=product_id)
                    if (product.quantity < 1):
                        return Response({'Error': 'Product out of stock'})
                    else:
                        result = []
                        cart_items = cart.cart_items.order_by('product').all()
                        if cart_items.filter(product=product).exists():
                            return Response({'Error': 'Product already in cart'}, status=status.HTTP_409_CONFLICT)
                        else:
                            CartItem.objects.create(cart=cart, product=product, count=count)
                            total_items = int(cart.total_items) + 1
                            total_items = Cart.objects.filter(user=user).update(total_items=total_items)
                            
                            for cart_item in cart_items:
                                item = {}
                                item['id'] = cart_item.id
                                item['count'] = cart_item.count
                                product = ProductSerializer(product) 
                                item['product'] = product.data
                                result.append(item)
                            return Response({'item_add': result}, status=status.HTTP_200_OK)
                return Response({'Error': 'Product does not exist'}, status=status.HTTP_404_NOT_FOUND)

class RemoveItemView(APIView):

    permission_classes=(permissions.AllowAny,)

    def delete(self, request, format=None):
        user = self.request.user
        data = self.request.data
        product_id = data['product_id']
        # count = data['count']
        try:
            Cart.objects.filter(user=user).exists()
        except:
            return Response({'Error': 'Your Account is not logged in'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            cart = Cart.objects.get(user=user)
            result = []
            if cart.cart_items.all().exists:
                cart_items = cart.cart_items.order_by('product').all()
                try:
                    product_id = int(product_id)
                except:
                    return Response({'Error': 'Product ID invalid. Product must be an integer'})
                else:
                    if Product.objects.filter(id=product_id).exists():
                        product = Product.objects.get(id=product_id)
                       
                        if cart_items.filter(product=product).exists():
                            cart_items.filter(product=product).delete()
                            total_items = int(cart.total_items) - 1
                            total_items = Cart.objects.filter(user=user).update(total_items=total_items)
                            for cart_item in cart_items:
                                item = {}
                                item['id'] = cart_item.id
                                item['count'] = cart_item.count
                                product = Product.objects.get(id=cart_item.product.id)
                                product = ProductSerializer(product)
                                item['product'] = product.data
                                result.append(item)
                            return Response({'cart_items': result}, status=status.HTTP_200_OK)

                        return Response({'Error': 'Product is not in cart'}, status=status.HTTP_409_CONFLICT)
                    return Response({'Error': 'Product does nost exist. Can not Remove'}, status=status.HTTP_409_CONFLICT)    
                
            return Response({'cart_items': result}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class EmptyCartView(APIView):
    permission_classes=(permissions.AllowAny,)

    def delete(self, request, format=None):
        user = self.request.user

        try:
            Cart.objects.filter(use=user).exists()
        except:
            return Response({'Error': 'Your Account is not logged in'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            cart = Cart.objects.get(use=user)
            if not cart.cart_items.all().exists():
                return Response({'success': 'Cart is already empty'}, status=status.HTTP_200_OK)
            else:
                cart.cart_items.all().delete()
                cart.total_items.update(total_items=0)
                return Response({'success': 'Cart emptied successfully'}, status=status.HTTP_200_OK)
            
class GetTotalPriceView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        try:
            Cart.objects.filter(user=user).exists()

        except:
            return Response({'Error': 'Your Account is not logged in'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            cart = Cart.objects.get(user=user)
            total_cost = 0.0
            total_compare_post = 0.0
            if cart.cart_items.all().exists():
                cart_items = cart.cart_items.order_by('product').all()
                for cart_item in cart_items:
                    total_cost += (int(cart_item.count) * float(cart_item.product.price))
                    total_compare_post += (int(cart_item.count) * float(cart_item.product.compare_price))
                total_cost = round(total_cost, 2)
                total_compare_post = round(total_compare_post, 2)
            return Response({'total_cost': total_cost, 'total_compare_cost': total_compare_post}, status=status.HTTP_200_OK)
            
class GetTotalItemView(APIView):
    def get(self, request, formate=None):
        user = self.request.user
        try:
            Cart.objects.filter(user=user).exists()

        except:
            return Response({'Error': 'Your Account is not logged in'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            cart = Cart.objects.get(user=user)
        
            total_items = cart.total_items
            return Response({'total_items': total_items}, status=status.HTTP_200_OK)
        
    
class UpdateItemView(APIView):
    permission_classes=(permissions.AllowAny,)
    def put(self, request, formate=None):
        user = self.request.user
        data = self.request.data
        product_id = data['product_id']
        count = data['count']
        try:
            Cart.objects.filter(user=user).exists()

        except:
            return Response({'Error': 'Your Account is not logged in'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            cart = Cart.objects.get(user=user)
            if cart.cart_items.all().exists:
                cart_items = cart.cart_items.order_by('product').all()
                
                try:
                    product_id = int(product_id)
                except:
                    return Response({'Error': 'Product ID invalid. Product ID must be an integer'})

                else:
                    if Product.objects.filter(id=product_id).exists():
                        product = Product.objects.get(id=product_id)
                        quantity = product.quantity
                        if count <= quantity and quantity > 0:

                            cart_items.filter(product=product).update(count=count)
                            result = []

                            for cart_item in cart_items:
                                item = {}
                                item['id'] = cart_item.id
                                item['count'] = cart_item.count
                                product = Product.objects.get(id=cart_item.product.id)
                                product = ProductSerializer(product)
                                item['product'] = product.data
                                result.append(item)
                            return Response({'cart_items': result}, status=status.HTTP_200_OK)
                                    
                        return Response({'Error': 'The product is out of stock or the quantity added is too large'}, status=status.HTTP_409_CONFLICT)

                    return Response({'Error': 'Product is not in cart'}, status=status.HTTP_409_CONFLICT)

        

                
                    







   