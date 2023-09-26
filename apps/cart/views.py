from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from .models import Cart, CartItem
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from apps.product.models import Product
from apps.product.serializers import  ProductSerializer
from django.db import transaction
from django.db.models import Sum, F
from django.db import models  # Import models







# Create your views here.

  
class AddOrUpdateItemView(APIView):
    permission_classes=(permissions.AllowAny,)
    
    def put(self, request, format=None):
        user = self.request.user
        data = self.request.data
        product_id = data.get('product_id')
        count = data.get('count')

        if not user.is_authenticated:
            return Response({'Error': 'Your Account is not logged in'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            product_id = int(product_id)
            product = get_object_or_404(Product, id=product_id, quantity__gt=0)
        except (ValueError, Product.DoesNotExist):
            return Response({'Error': 'Product does not exist or is out of stock'}, status=status.HTTP_400_BAD_REQUEST)

        cart, created = Cart.objects.get_or_create(user=user)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)

        if not created:
            # Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
            cart_item.count += int(count)
            cart_item.save()
        else:
            # Sản phẩm mới, tạo mới CartItem
            cart_item.count = int(count)
            cart_item.save()
            cart.total_items += 1
            cart.save()
      
        cart_items = cart.cart_items.select_related('product').all()
        result = [{'id': item.id, 'count': item.count, 'product': ProductSerializer(item.product).data} for item in cart_items]

        return Response({'item_add': result}, status=status.HTTP_200_OK)








    






       

class GetItemsView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            cart = Cart.objects.get(user=user)
        except Cart.DoesNotExist:
            return Response({'error': 'Your account is not logged in'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        cart_items = cart.cart_items.all().order_by('product')
        result = []
        for cart_item in cart_items:
            item = {
                'id': cart_item.id,
                'count': cart_item.count,
                'product': ProductSerializer(cart_item.product).data
            }
            result.append(item)

        return Response({'cart': result}, status=status.HTTP_200_OK)







class RemoveItemView(APIView):

    permission_classes=(permissions.AllowAny,)

    def delete(self, request, format=None):
        user = self.request.user
        product_id = self.request.data.get('product_id')

        # Kiểm tra tồn tại của giỏ hàng, nếu không tồn tại sẽ ném lỗi 404
        cart = get_object_or_404(Cart, user=user)

        product = get_object_or_404(Product, id=product_id)

        cart_item = cart.cart_items.filter(product=product).first()

        result = []

        if cart_item:
            cart_item.delete()
            cart.total_items -= 1
            cart.save()

            cart_items = cart.cart_items.all().order_by('product')

            for cart_item in cart_items:
                    item = {
                        'id': cart_item.id,
                        'count': cart_item.count,
                        'product': ProductSerializer(cart_item.product).data
                    }
                    result.append(item)


            return Response({'cart': result}, status=status.HTTP_200_OK)
        else:
            return Response({'Error': 'Product is not in cart.'}, status=status.HTTP_409_CONFLICT)






class EmptyCartView(APIView):
    permission_classes = (permissions.AllowAny,)

    def delete(self, request, format=None):
        user = self.request.user

        # Kiểm tra tồn tại của giỏ hàng, nếu không tồn tại sẽ ném lỗi 404
        cart = get_object_or_404(Cart, user=user)

        cart_items = cart.cart_items.all()
        if cart_items.exists():
            cart_items.delete()
            cart.total_items = 0
            cart.save()
            return Response({'success': 'Cart emptied successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'success': 'Cart is already empty'}, status=status.HTTP_200_OK)



class GetTotalPricesView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        user = self.request.user
        cart = get_object_or_404(Cart, user=user)

        cart_items = cart.cart_items.select_related('product').all()

        total_cost = 0.0
        total_compare_cost = 0.0

        for cart_item in cart_items:
            count = float(cart_item.count)
            product = cart_item.product

            total_cost += count * float(product.price)
            total_compare_cost += count * float(product.compare_price)

        total_cost = round(total_cost, 2)
        total_compare_cost = round(total_compare_cost, 2)

        return Response({'total_cost': total_cost, 'total_compare_cost': total_compare_cost}, status=status.HTTP_200_OK)







class GetTotalItemsView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        cart = get_object_or_404(Cart, user=self.request.user)
        total_items = cart.total_items
        return Response({'total_items': total_items}, status=status.HTTP_200_OK)



