from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import TodoList, Todo
from .serializer import TodoListSerializer, TodoSerializer


class TodoListViewSet(viewsets.ModelViewSet):
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = (
            self.request.user
            if self.request.user.is_authenticated
            else User.objects.first()
        )
        serializer.save(user=user)


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [AllowAny]
