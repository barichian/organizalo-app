from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from plane.db.models import User, Project
from plane.app.views.wrapper import WebhookEndpoint
from plane.services.integrations.whatsapp_service import WhatsAppService

class WhatsAppWebhookEndpoint(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        payload = request.data
        
        # Basic validation for WAHA payload
        if not payload or 'payload' not in payload:
            return Response({"error": "Invalid payload"}, status=status.HTTP_400_BAD_REQUEST)

        # Extract message details
        message_data = payload.get('payload', {})
        sender_id = message_data.get('from', '')
        text_body = message_data.get('body', '')

        if not sender_id or not text_body:
             return Response({"status": "ignored", "reason": "missing data"}, status=status.HTTP_200_OK)

        # Clean phone number (remove @c.us if present)
        phone_number = sender_id.split('@')[0]
        
        try:
            # Find user by phone number
            user = User.objects.get(mobile_number=phone_number)
            
            # TODO: Logic to select which project to post to. 
            # For now, we might pick the user's first project or a specific defaultone
            # This logic likely needs refinement based on the user's exact requirements
            # For MVP: We find a project and create an issue.
            
            # Temporarily logging/returning success
            return Response({"status": "processed", "user": user.email}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
             return Response({"status": "ignored", "reason": "user not found"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class WhatsAppQREndpoint(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        service = WhatsAppService()
        qr_image = service.get_screenshot()
        if qr_image:
             return Response(qr_image, content_type="image/png")
        return Response({"error": "Failed to get QR"}, status=status.HTTP_404_NOT_FOUND)
