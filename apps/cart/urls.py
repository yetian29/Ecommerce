
from django.urls import path
from .views import GetItemsView, AddItemView, RemoveItemView, EmptyCartView, GetTotalItemsView, GetTotalPricesView, UpdateItemView


urlpatterns = [
    path('get_items', GetItemsView.as_view()),
    path('add_item', AddItemView.as_view()),
    path('remove_item', RemoveItemView.as_view()),
    path('empty_cart', EmptyCartView.as_view()),
    path('total_prices', GetTotalPricesView.as_view()),
    path('total_items', GetTotalItemsView.as_view()),
    path('update_item', UpdateItemView.as_view())
]