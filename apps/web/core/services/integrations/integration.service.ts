import { API_BASE_URL } from "@plane/constants";
import type { IAppIntegration, IImporterService, IWorkspaceIntegration, IExportServiceResponse } from "@plane/types";
import { APIService } from "@/services/api.service";
// types
// helper

export class IntegrationService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async getAppIntegrationsList(): Promise<IAppIntegration[]> {
    return this.get(`/api/integrations/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getWorkspaceIntegrationsList(workspaceSlug: string): Promise<IWorkspaceIntegration[]> {
    return this.get(`/api/workspaces/${workspaceSlug}/workspace-integrations/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async deleteWorkspaceIntegration(workspaceSlug: string, integrationId: string): Promise<any> {
    return this.delete(`/api/workspaces/${workspaceSlug}/workspace-integrations/${integrationId}/provider/`)
      .then((res) => res?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getImporterServicesList(workspaceSlug: string): Promise<IImporterService[]> {
    return this.get(`/api/workspaces/${workspaceSlug}/importers/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
  async getExportsServicesList(
    workspaceSlug: string,
    cursor: string,
    per_page: number
  ): Promise<IExportServiceResponse> {
    return this.get(`/api/workspaces/${workspaceSlug}/export-issues`, {
      params: {
        per_page,
        cursor,
      },
    })
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async deleteImporterService(workspaceSlug: string, service: string, importerId: string): Promise<any> {
    return this.delete(`/api/workspaces/${workspaceSlug}/importers/${service}/${importerId}/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  // WhatsApp Integration
  async getWhatsAppQR(): Promise<{ qr_image: string }> {
    return this.get(`/api/integrations/whatsapp/qr/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getWhatsAppStatus(): Promise<{ status: string }> {
    return this.get(`/api/integrations/whatsapp/status/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async sendWhatsAppTestMessage(phone: string, message: string): Promise<any> {
    return this.post(`/api/integrations/whatsapp/send/`, { phone, message })
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
