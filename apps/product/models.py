from django.db import models
from apps.category.models import Category
from datetime import datetime

# Create your models here.


class Product(models.Model):

    def get_media_path(instance, filename):
        return "ecommerce/{0}/{1}".format(instance.name, filename)
    

    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to=get_media_path)
    compare_price = models.DecimalField(max_digits=8, decimal_places=2)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.IntegerField(default=0)
    sold = models.IntegerField(default=0)
    rating = models.IntegerField(default=0 )
    description = models.TextField()
    date_created = models.DateTimeField(default=datetime.now)


    def __str__(self):
        return self.name
    


    
    
