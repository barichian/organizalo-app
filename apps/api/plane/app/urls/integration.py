from django.urls import path
from plane.app.views.integration import WhatsAppWebhookEndpoint, WhatsAppQREndpoint

urlpatterns = [
    path("whatsapp/webhook/", WhatsAppWebhookEndpoint.as_view(), name="whatsapp-webhook"),
    path("whatsapp/qr/", WhatsAppQREndpoint.as_view(), name="whatsapp-qr"),
]
