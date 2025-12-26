import requests
from django.conf import settings

class WhatsAppService:
    def __init__(self):
        # In a real scenario, these should be in django settings
        self.base_url = "http://whatsapp:3000" 
        self.api_key = "plane"
        self.headers = {
            "X-Api-Key": self.api_key,
            "Content-Type": "application/json"
        }

    def get_screenshot(self, session_id="default"):
        """
        Get the QR code screenshot in base64 format.
        """
        try:
            url = f"{self.base_url}/api/screenshot"
            params = {"session": session_id}
            response = requests.get(url, headers=self.headers, params=params)
            response.raise_for_status()
            # WAHA returns the image binary or base64 depending on endpoint configuration
            # Specifically /api/screenshot returns the image binary by default
            # But the detailed plan implied showing a QR code. 
            # WAHA has /api/sessions/{session}/auth/qr which returns the QR data
            # Let's use the screenshot endpoint for simplicity if it returns an image we can display
            return response.content
        except requests.RequestException as e:
            print(f"Error fetching WhatsApp screenshot: {e}")
            return None

    def get_session_status(self, session_id="default"):
        try:
            url = f"{self.base_url}/api/sessions/{session_id}"
            response = requests.get(url, headers=self.headers)
            if response.status_code == 404:
                return "STOPPED"
            response.raise_for_status()
            return response.json().get("status", "UNKNOWN")
        except requests.RequestException:
            return "ERROR"
            
    def start_session(self, session_id="default"):
        """
        Ensure the session exists/starts
        """
        try:
            url = f"{self.base_url}/api/sessions"
            data = {"name": session_id}
            response = requests.post(url, headers=self.headers, json=data)
            # 201 created, 400 maybe already exists?
            return response.ok
        except requests.RequestException:
            return False

    def send_message(self, phone, message, session_id="default"):
        try:
            url = f"{self.base_url}/api/sendText"
            # Chat ID usually needs @c.us suffix for numbers
            chat_id = f"{phone}@c.us" if "@" not in phone else phone
            
            payload = {
                "session": session_id,
                "chatId": chat_id,
                "text": message
            }
            response = requests.post(url, headers=self.headers, json=payload)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Error sending WhatsApp message: {e}")
            return None
