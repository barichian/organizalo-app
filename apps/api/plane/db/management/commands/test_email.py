from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from django.conf import settings

class Command(BaseCommand):
    help = "Send a test email to verify SMTP configuration"

    def add_arguments(self, parser):
        parser.add_argument(
            "--recipient",
            type=str,
            required=True,
            help="The email address to send the test message to",
        )

    def handle(self, *args, **options):
        recipient = options["recipient"]
        subject = "Organizalo: Prueba de Correo / Test Email"
        message = (
            "Hola!\n\n"
            "Si estás leyendo esto, la configuración SMTP de Organizalo funciona correctamente.\n"
            "If you are reading this, Organizalo SMTP configuration is working correctly.\n\n"
            "Saludos,\n"
            "El equipo de Organizalo"
        )
        
        self.stdout.write(f"Attempting to send email to {recipient}...")
        self.stdout.write(f"Backend: {settings.EMAIL_BACKEND}")
        self.stdout.write(f"Host: {settings.EMAIL_HOST}:{settings.EMAIL_PORT}")
        self.stdout.write(f"User: {settings.EMAIL_HOST_USER}")
        self.stdout.write(f"From: {settings.DEFAULT_FROM_EMAIL}")

        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [recipient],
                fail_silently=False,
            )
            self.stdout.write(self.style.SUCCESS(f"✅ Email sent successfully to {recipient}"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"❌ Failed to send email: {e}"))
