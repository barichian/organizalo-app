import React from "react";

export default function TermsOfServicePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-custom-text-100">Términos de Servicio</h1>
            <p className="text-custom-text-200 mb-4">
                Bienvenido a Organizalo. Al utilizar nuestros servicios, aceptas estos términos.
            </p>
            <div className="space-y-4 text-custom-text-200">
                <h2 className="text-xl font-semibold text-custom-text-100">1. Aceptación de los Términos</h2>
                <p>
                    Al acceder y utilizar Organizalo, aceptas cumplir con estos Términos de Servicio y todas las leyes y regulaciones aplicables.
                </p>
                <h2 className="text-xl font-semibold text-custom-text-100">2. Uso del Servicio</h2>
                <p>
                    Te comprometes a utilizar el servicio solo para fines legales y de una manera que no infrinja los derechos de, restrinja o inhiba el uso y disfrute del servicio por parte de cualquier otra persona.
                </p>
                <h2 className="text-xl font-semibold text-custom-text-100">3. Propiedad Intelectual</h2>
                <p>
                    El contenido, organización, gráficos, diseño, compilación y otros asuntos relacionados con el sitio están protegidos por derechos de autor, marcas registradas y otros derechos de propiedad.
                </p>
                <h2 className="text-xl font-semibold text-custom-text-100">4. Cambios en los Términos</h2>
                <p>
                    Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos de cualquier cambio publicando los nuevos términos en este sitio.
                </p>
                <p className="mt-8 text-sm">
                    Última actualización: {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
