import { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "@plane/propel/button";
import { IntegrationService } from "@/services/integrations";

const integrationService = new IntegrationService();

type Props = {
    isOpen: boolean;
    onClose: () => void;
    workspaceSlug: string;
};

export const WhatsAppConnectModal = ({ isOpen, onClose, workspaceSlug }: Props) => {
    const [qrImage, setQrImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("DISCONNECTED");

    const fetchQR = async () => {
        setLoading(true);
        try {
            const data = await integrationService.getWhatsAppQR();
            if (data.qr_image) {
                setQrImage(data.qr_image);
            }
        } catch (e) {
            console.error("Failed to fetch QR:", e);
        } finally {
            setLoading(false);
        }
    };

    const checkStatus = async () => {
        try {
            const data = await integrationService.getWhatsAppStatus();
            setStatus(data.status);
        } catch (error) {
            console.error("Failed to check status:", error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchQR();
            const interval = setInterval(checkStatus, 3000);
            return () => clearInterval(interval);
        }
    }, [isOpen]);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            Conectar WhatsApp
                        </Dialog.Title>
                        <div className="mt-4 flex flex-col items-center justify-center min-h-[300px]">
                            {loading ? (
                                <div className="flex flex-col items-center">
                                    <p className="text-sm text-gray-500">Generando código QR...</p>
                                </div>
                            ) : status === 'CONNECTED' || status === 'WORKING' ? (
                                <div className="flex flex-col items-center py-8">
                                    <div className="bg-green-100 p-4 rounded-full mb-4">
                                        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <p className="text-green-600 font-bold text-xl">¡Conectado!</p>
                                    <p className="mt-2 text-sm text-center text-gray-500">
                                        Tu cuenta de WhatsApp se ha vinculado exitosamente con Organizalo.
                                    </p>
                                </div>
                            ) : qrImage ? (
                                <>
                                    <img src={qrImage} alt="WhatsApp QR Code" className="w-64 h-64 border-2 border-gray-100 rounded-lg shadow-sm" />
                                    <div className="mt-6 text-xs text-center text-gray-500 px-4 space-y-2">
                                        <p>1. Abre WhatsApp en tu teléfono</p>
                                        <p>2. Toca Menú o Configuración y selecciona Dispositivos vinculados</p>
                                        <p>3. Toca Vincular un dispositivo y apunta tu teléfono a esta pantalla</p>
                                        <p className="pt-2 text-custom-primary-100 font-medium">Nota: Organizalo funciona mejor con números de Venezuela (+58).</p>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-red-500 text-sm font-medium">Error al cargar el código QR</p>
                                    <p className="text-xs text-gray-400 mt-1">Por favor verifica que el servicio WAHA esté activo.</p>
                                    <Button variant="neutral-primary" onClick={fetchQR} className="mt-4">
                                        Reintentar
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button variant="neutral-primary" onClick={onClose} className="w-full sm:w-auto">
                                {status === 'CONNECTED' || status === 'WORKING' ? "Listo" : "Cancelar"}
                            </Button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    );
};
