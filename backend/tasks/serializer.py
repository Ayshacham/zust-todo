from rest_framework import serializers
from .models import TodoList, Todo


class TodoListSerializer(serializers.ModelSerializer):
    class Meta:  # pyright: ignore[reportIncompatibleVariableOverride]
        model = TodoList
        fields = "__all__"
        read_only_fields = ["id", "user", "created_at", "updated_at"]


class TodoSerializer(serializers.ModelSerializer):
    class Meta:  # pyright: ignore[reportIncompatibleVariableOverride]
        model = Todo
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]
