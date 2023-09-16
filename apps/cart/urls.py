
from django.urls import path
from .views import GetItemsView, AddItemView


urlpatterns = [
    path('get_items', GetItemsView.as_view()),
    path('add_item', AddItemView.as_view())
]