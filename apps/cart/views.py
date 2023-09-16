from django.shortcuts import render
from rest_framework.views import APIView
from .models import Cart, CartItem
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from apps.product.models import Product
from apps.product.serializers import ProductSerializer

# Create your views here.


class GetItemsView(APIView):
    pass
  
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
                        cart_items = cart.cart_items.all()
                        if (cart_items != None):
                            if cart_items.filter(product=product).exists():
                                return Response({'Error': 'Product already in cart'}, status=status.HTTP_409_CONFLICT)
                            else:
                               CartItem.objects.create(cart=cart, product=product, count=count)
                               total_items = int(cart.total_items) + 1
                               total_items = Cart.objects.filter(user=user).update(total_items=total_items)
                               result = []
                               item = {}
                               item['id'] = product_id
                               item['count'] = count
                               product = ProductSerializer(product)
                               item['product'] = product.data
                               result.append(item)
                               return Response({'item_add': result}, status=status.HTTP_200_OK)

                        else:
                               CartItem.objects.create(cart=cart, product=product, count=count)
                               total_items = int(cart.total_items) + 1
                               total_items = cart.update(total_items=total_items)
                               result = []
                               item = {}
                               item['id'] = product_id
                               item['count'] = count
                               product = ProductSerializer(product)
                               item['product'] = product.data
                               result.append(item)
                               return Response({'item_add': result}, status=status.HTTP_200_OK)


                return Response({'Error': 'Product does not exist'}, status=status.HTTP_404_NOT_FOUND)


                
               
                 





   