from django.urls import path

from .views import ProductListView, ProductDetailView, ProductListCategoryView, ProductBySearchView

urlpatterns = [
   path('', ProductListView.as_view()),
   path('<product_id>', ProductDetailView.as_view()),
   path('category/<category_id>', ProductListCategoryView.as_view()),
   path('by/search', ProductBySearchView.as_view())

]