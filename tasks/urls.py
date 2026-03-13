from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("create/", views.create_list, name="create_list"),
    path("<int:id>/", views.detail, name="detail"),
    path("<int:id>/update/", views.update_list, name="update_list"),
    path("<int:id>/delete/", views.delete_list, name="delete_list"),
    path("<int:list_id>/task/create/", views.create_task, name="create_task"),
    path("<int:list_id>/task/<int:task_id>/update/", views.update_task, name="update_task"),
    path("<int:list_id>/task/<int:task_id>/delete/", views.delete_task, name="delete_task"),
    path("<int:list_id>/task/<int:task_id>/complete/", views.complete_task, name="complete_task"),
]
