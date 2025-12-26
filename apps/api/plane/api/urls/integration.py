from django.urls import path, include
from rest_framework.routers import DefaultRouter
from plane.api.views.integration import WhatsAppViewSet

router = DefaultRouter()
router.register(r"integrations/whatsapp", WhatsAppViewSet, basename="whatsapp")

urlpatterns = [
    path("", include(router.urls)),
]
