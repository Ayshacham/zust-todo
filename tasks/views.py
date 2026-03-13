import django
from django.http import HttpResponse
from django.shortcuts import render
from tasks.models import TodoList, Todo


def index(request):
    todoLists = TodoList.objects.all()
    context = {
        "todoLists": todoLists,
    }

    return render(request, "tasks/index.html", context)


def detail(request, id):
    tasks = Todo.objects.filter(list_id=id)
    context = {
        "tasks": tasks,
    }
    return render(request, "tasks/detail.html", context)
