# Python imports

# Django imports
from django.db import models

# Module imports
from plane.db.models.project import ProjectBaseModel


class WhatsAppProjectSync(ProjectBaseModel):
    webhook_url = models.URLField(max_length=1000, blank=True, null=True)
    api_key = models.CharField(max_length=300, blank=True, null=True)
    phone_number_id = models.CharField(max_length=50, blank=True, null=True)
    waha_url = models.URLField(max_length=1000, blank=True, null=True)
    data = models.JSONField(default=dict)
    workspace_integration = models.ForeignKey(
        "db.WorkspaceIntegration", related_name="whatsapp_syncs", on_delete=models.CASCADE
    )

    def __str__(self):
        """Return the project name"""
        return f"{self.project.name} <WhatsApp>"

    class Meta:
        unique_together = ["project", "workspace_integration"]
        verbose_name = "WhatsApp Project Sync"
        verbose_name_plural = "WhatsApp Project Syncs"
        db_table = "whatsapp_project_syncs"
        ordering = ("-created_at",)
