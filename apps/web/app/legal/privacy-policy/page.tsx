import React from "react";

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-custom-text-100">Política de Privacidad</h1>
            <p className="text-custom-text-200 mb-4">
                En Organizalo, respetamos tu privacidad y estamos comprometidos a protegerla.
            </p>
            <div className="space-y-4 text-custom-text-200">
                <h2 className="text-xl font-semibold text-custom-text-100">1. Recopilación de Información</h2>
                <p>
                    Recopilamos información que nos proporcionas directamente, como cuando creas una cuenta, actualizas tu perfil o utilizas nuestros servicios.
                </p>
                <h2 className="text-xl font-semibold text-custom-text-100">2. Uso de la Información</h2>
                <p>
                    Utilizamos la información que recopilamos para proporcionar, mantener, proteger y mejorar nuestros servicios, desarrollar nuevos servicios y proteger a Organizalo y a nuestros usuarios.
                </p>
                <h2 className="text-xl font-semibold text-custom-text-100">3. Compartir Información</h2>
                <p>
                    No compartimos información personal con empresas, organizaciones e individuos fuera de Organizalo, a menos que tengamos tu consentimiento o sea requerido por ley.
                </p>
                <h2 className="text-xl font-semibold text-custom-text-100">4. Seguridad</h2>
                <p>
                    Nos esforzamos por proteger a Organizalo y a nuestros usuarios del acceso no autorizado o la alteración, divulgación o destrucción no autorizada de la información que poseemos.
                </p>
                <p className="mt-8 text-sm">
                    Última actualización: {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
