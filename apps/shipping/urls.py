
from django.urls import path

from .views import GetShippingView

urlpatterns = [
    path('get_shipping', GetShippingView.as_view())
]