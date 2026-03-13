from typing import cast

from rest_framework import viewsets
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request

from .authentication import SupabaseUser
from .models import TodoList, Todo
from .serializer import TodoListSerializer, TodoSerializer


class SupabaseUserMixin:
    request: Request

    @property
    def _current_user(self) -> SupabaseUser:
        return cast(SupabaseUser, self.request.user)


class TodoListViewSet(SupabaseUserMixin, viewsets.ModelViewSet):
    serializer_class = TodoListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TodoList.objects.filter(user_id=self._current_user.id)

    def perform_create(self, serializer):
        serializer.save(user_id=self._current_user.id)


class TodoViewSet(SupabaseUserMixin, viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def _get_list_id(self):
        return self.kwargs.get("list_pk") or self.request.query_params.get("list")

    def get_queryset(self):
        base = Todo.objects.filter(list__user_id=self._current_user.id)
        list_id = self._get_list_id()
        if list_id:
            return base.filter(list_id=list_id)
        return base

    def perform_create(self, serializer):
        list_id = self._get_list_id() or self.request.data.get("list")
        if not list_id:
            raise NotFound("List ID required")
        try:
            todo_list = TodoList.objects.get(
                id=list_id, user_id=self._current_user.id
            )
        except TodoList.DoesNotExist:
            raise NotFound("List not found")
        serializer.save(list=todo_list)
