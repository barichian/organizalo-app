# Third party imports
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated

# Module imports
from plane.api.views import BaseViewSet
from plane.services.integrations.whatsapp_service import WhatsAppService
from plane.db.models.integration.whatsapp import WhatsAppProjectSync

class WhatsAppViewSet(BaseViewSet):
    permission_classes = [IsAuthenticated]
    model = WhatsAppProjectSync
    
    def get_service(self):
        return WhatsAppService()

    @action(detail=False, methods=["get"], url_path="qr")
    def get_qr(self, request):
        service = self.get_service()
        # Fetch screenshot (QR)
        # WAHA Screenshot endpoint returns the image directly
        screenshot = service.get_screenshot()
        if screenshot:
            import base64
            # return base64 encoded image for frontend to render easily
            encoded = base64.b64encode(screenshot).decode('utf-8')
            return Response({"qr_image": f"data:image/png;base64,{encoded}"}, status=status.HTTP_200_OK)
        return Response({"error": "Failed to fetch QR code"}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["get"], url_path="status")
    def get_status(self, request):
        service = self.get_service()
        state = service.get_session_status()
        return Response({"status": state})

    @action(detail=False, methods=["post"], url_path="send")
    def send_test_message(self, request):
        phone = request.data.get("phone")
        message = request.data.get("message")
        if not phone or not message:
            return Response({"error": "Phone and message required"}, status=status.HTTP_400_BAD_REQUEST)
        
        service = self.get_service()
        result = service.send_message(phone, message)
        if result:
            return Response(result, status=status.HTTP_200_OK)
        return Response({"error": "Failed to send message"}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["post"], url_path="webhook", permission_classes=[AllowAny])
    def webhook(self, request):
        # WAHA sends events here
        # payload = request.data
        # Process incoming message...
        # For now just log and return 200
        print(f"WhatsApp Webhook: {request.data}")
        return Response({"status": "received"}, status=status.HTTP_200_OK)
