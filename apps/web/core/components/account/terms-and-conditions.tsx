import React from "react";
import Link from "next/link";
import { EAuthModes } from "@plane/constants";

interface TermsAndConditionsProps {
  authType?: EAuthModes;
}

// Constants for better maintainability
const LEGAL_LINKS = {
  termsOfService: "/legal/terms-of-service",
  privacyPolicy: "/legal/privacy-policy",
} as const;

const MESSAGES = {
  [EAuthModes.SIGN_UP]: "Al crear una cuenta",
  [EAuthModes.SIGN_IN]: "Al iniciar sesión",
} as const;

// Reusable link component to reduce duplication
function LegalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-custom-text-200" target="_blank" rel="noopener noreferrer">
      <span className="text-sm font-medium underline hover:cursor-pointer">{children}</span>
    </Link>
  );
}

export function TermsAndConditions({ authType = EAuthModes.SIGN_IN }: TermsAndConditionsProps) {
  return (
    <div className="flex items-center justify-center">
      <p className="text-center text-sm text-custom-text-300 whitespace-pre-line">
        {`${MESSAGES[authType]}, aceptas nuestros \n`}
        <LegalLink href={LEGAL_LINKS.termsOfService}>Términos de Servicio</LegalLink> y{" "}
        <LegalLink href={LEGAL_LINKS.privacyPolicy}>Política de Privacidad</LegalLink>.
      </p>
    </div>
  );
}
