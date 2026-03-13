from django.db import models
from django.contrib.auth.models import User


class TodoList(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    user_id = models.UUIDField()
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "todo_list"
        managed = False

    def __str__(self):
        return self.name


class Todo(models.Model):
    id = models.AutoField(primary_key=True)
    list = models.ForeignKey(TodoList, on_delete=models.CASCADE, related_name="todos")
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateTimeField(null=True, blank=True)
    order = models.IntegerField(default=0, db_column="order")

    class Meta:
        db_table = "todos"
        managed = False
        ordering = ["order", "created_at"]

    def __str__(self):
        return self.title
