import { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "@plane/propel/button";
import { IntegrationService } from "@/services/integrations";

// You might need to add this method to IntegrationService in frontend as well
// For now, let's assume valid API call
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
            // Assuming we have a service method or using fetch directly
            // Replace with actual API client call
            const response = await fetch(`/api/integrations/whatsapp/qr`);
            const data = await response.json();
            if (data.qr_image) {
                setQrImage(data.qr_image);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const checkStatus = async () => {
        try {
            const response = await fetch(`/api/integrations/whatsapp/status`);
            const data = await response.json();
            setStatus(data.status);
            if (data.status === 'CONNECTED' || data.status === 'WORKING') {
                // Close modal or show success
                // onClose();
            }
        } catch (error) {
            console.error(error);
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
                            Connect WhatsApp
                        </Dialog.Title>
                        <div className="mt-4 flex flex-col items-center justify-center">
                            {loading ? (
                                <p>Loading QR Code...</p>
                            ) : status === 'CONNECTED' || status === 'WORKING' ? (
                                <div className="flex flex-col items-center">
                                    <p className="text-green-500 font-bold text-xl">Connected!</p>
                                    <p className="mt-2 text-sm text-gray-500">You can now close this window.</p>
                                </div>
                            ) : qrImage ? (
                                <>
                                    <img src={qrImage} alt="WhatsApp QR Code" className="w-64 h-64 border-2 border-gray-200 rounded-lg" />
                                    <p className="mt-4 text-sm text-gray-500">
                    Open WhatsApp on your phone > Settings > Linked Devices > Link a Device > Scan QR Code
                                    </p>
                                </>
                            ) : (
                                <p className="text-red-500">Failed to load QR Code. Is the service running?</p>
                            )}
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Button variant="neutral-primary" onClick={onClose} className="ml-2">
                                Close
                            </Button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    );
};
