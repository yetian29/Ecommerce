from django.contrib import admin
from .models import Product

# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'category', 'name', 'compare_price', 'price', 'quantity','sold','date_created',)
    list_display_links = ('id', 'name',)
    list_filter  = ('category',)
    list_editable = ('compare_price', 'price', 'quantity', 'sold',)
    search_fields = ('name',)

admin.site.register(Product, ProductAdmin)
