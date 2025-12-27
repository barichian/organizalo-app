# Third party imports
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated

# Module imports
from plane.app.views import BaseViewSet
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
        try:
            data = request.data
            # WAHA payload structure validation
            payload = data.get("payload", {})
            if not payload:
                 return Response({"status": "ignored", "reason": "no payload"}, status=status.HTTP_200_OK)

            from_id = payload.get("from", "")
            if not from_id.endswith("@c.us"):
                # Ignore groups or status updates for now
                return Response({"status": "ignored", "reason": "not a direct message"}, status=status.HTTP_200_OK)

            # Extract phone number (remove @c.us)
            phone_number = from_id.split("@")[0]
            body = payload.get("body", "").strip()

            if not body:
                return Response({"status": "ignored", "reason": "empty body"}, status=status.HTTP_200_OK)

            # Find user
            from plane.db.models.user import User
            from plane.db.models.project import Project
            from plane.db.models.issue import Issue
            from plane.db.models.state import State

            user = User.objects.filter(mobile_number=phone_number).first()
            
            if user:
                # Find a project for the user
                # Strategy: Use the last active project or the first one they are a member of
                project = Project.objects.filter(project_member__member=user).first()
                
                if project:
                    # Get default state (Backlog usually)
                    # We need a state to create an issue
                    state = State.objects.filter(project=project).order_by("sequence").first()
                    
                    if state:
                        Issue.objects.create(
                            name=body,
                            project=project,
                            state=state,
                            created_by=user,
                            # assign_to=[user] # Optional: assign to self
                        )
                        print(f"Created issue from WhatsApp for User: {user.email}")
                        return Response({"status": "created"}, status=status.HTTP_200_OK)
                    else:
                        print(f"No state found for project {project.name}")
                else:
                    print(f"No project found for user {user.email}")
            else:
                print(f"No user found for phone {phone_number}")

            return Response({"status": "received"}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error processing webhook: {e}")
            return Response({"error": "processing failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
