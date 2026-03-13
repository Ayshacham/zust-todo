from rest_framework import serializers
from .models import TodoList, Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:  # pyright: ignore[reportIncompatibleVariableOverride]
        model = Todo
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]


class TodoListSerializer(serializers.ModelSerializer):
    todos = TodoSerializer(many=True, read_only=True)

    class Meta:  # pyright: ignore[reportIncompatibleVariableOverride]
        model = TodoList
        fields = ["id", "name", "user_id", "created_at", "updated_at", "todos"]
        read_only_fields = ["id", "user_id", "created_at", "updated_at"]
