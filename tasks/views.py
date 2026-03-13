from django.contrib.auth.models import User
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_http_methods
from tasks.models import TodoList, Todo


def index(request):
    todoLists = TodoList.objects.all()
    context = {"todoLists": todoLists}
    return render(request, "tasks/index.html", context)


def detail(request, id):
    todo_list = get_object_or_404(TodoList, id=id)
    tasks = Todo.objects.filter(list_id=id).order_by("order", "created_at")
    context = {"tasks": tasks, "list": todo_list}
    return render(request, "tasks/detail.html", context)


# --- TodoList CRUD ---


@require_http_methods(["GET", "POST"])
def create_list(request):
    if request.method == "GET":
        return redirect("index")
    name = request.POST.get("name", "").strip()
    if name:
        user = User.objects.first()
        TodoList.objects.create(name=name, user=user)
    return redirect("index")


@require_http_methods(["POST"])
def update_list(request, id):
    todo_list = get_object_or_404(TodoList, id=id)
    name = request.POST.get("name", "").strip()
    if name:
        todo_list.name = name
        todo_list.save()
    return redirect("index")


@require_http_methods(["POST"])
def delete_list(request, id):
    todo_list = get_object_or_404(TodoList, id=id)
    todo_list.delete()
    return redirect("index")


# --- Todo CRUD ---


@require_http_methods(["GET", "POST"])
def create_task(request, list_id):
    todo_list = get_object_or_404(TodoList, id=list_id)
    if request.method == "POST":
        title = request.POST.get("title", "").strip()
        description = request.POST.get("description", "").strip()
        due_date_str = request.POST.get("due_date") or None
        due_date = None
        if due_date_str:
            from datetime import datetime

            try:
                due_date = datetime.strptime(due_date_str, "%Y-%m-%d")
            except ValueError:
                pass
        if title:
            Todo.objects.create(
                list=todo_list,
                title=title,
                description=description or None,
                due_date=due_date,
            )
        return redirect("detail", id=list_id)
    return redirect("detail", id=list_id)


@require_http_methods(["POST"])
def update_task(request, list_id, task_id):
    todo_list = get_object_or_404(TodoList, id=list_id)
    task = get_object_or_404(Todo, id=task_id, list=todo_list)
    task.title = request.POST.get("title", "").strip() or task.title
    task.description = request.POST.get("description", "").strip()
    due_date_str = request.POST.get("due_date") or None
    if due_date_str:
        from datetime import datetime

        try:
            task.due_date = datetime.strptime(due_date_str, "%Y-%m-%d")
        except ValueError:
            pass
    else:
        task.due_date = None
    task.save()
    return redirect("detail", id=list_id)


@require_http_methods(["POST"])
def delete_task(request, list_id, task_id):
    todo_list = get_object_or_404(TodoList, id=list_id)
    task = get_object_or_404(Todo, id=task_id, list=todo_list)
    task.delete()
    return redirect("detail", id=list_id)


@require_http_methods(["POST"])
def complete_task(request, list_id, task_id):
    todo_list = get_object_or_404(TodoList, id=list_id)
    task = get_object_or_404(Todo, id=task_id, list=todo_list)
    task.completed = not task.completed
    task.save()
    return redirect("detail", id=list_id)
