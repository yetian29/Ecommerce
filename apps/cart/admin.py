from django.contrib import admin
from .models import Cart, CartItem



# Register your models here.

class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_items',)

class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'product', 'count', )
   

admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)