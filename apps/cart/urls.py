
from django.urls import path
from .views import GetItemsView,  RemoveItemView, EmptyCartView, GetTotalItemsView, GetTotalPricesView, AddOrUpdateItemView


urlpatterns = [
    path('get_items', GetItemsView.as_view()),
    path('remove_item', RemoveItemView.as_view()),
    path('empty_cart', EmptyCartView.as_view()),
    path('total_prices', GetTotalPricesView.as_view()),
    path('total_items', GetTotalItemsView.as_view()),
    path('add_item', AddOrUpdateItemView.as_view())
]