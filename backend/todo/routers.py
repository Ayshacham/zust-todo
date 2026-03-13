from rest_framework.routers import SimpleRouter
from tasks.viewsets import TodoListViewSet, TodoViewSet

router = SimpleRouter()
router.register(r"lists", TodoListViewSet, basename="list")
router.register(r"todos", TodoViewSet, basename="todo")
