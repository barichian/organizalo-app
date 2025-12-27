import React from "react";
import { observer } from "mobx-react";
import Link from "next/link";
import { AUTH_TRACKER_ELEMENTS } from "@plane/constants";
import { useTranslation } from "@plane/i18n";
import { PlaneLockup } from "@plane/propel/icons";
import { PageHead } from "@/components/core/page-title";
import { EAuthModes } from "@/helpers/authentication.helper";
import { useInstance } from "@/hooks/store/use-instance";

const authContentMap = {
  [EAuthModes.SIGN_IN]: {
    pageTitle: "Regístrate",
    text: "Comienza tu camino para organizarlo, regístrate aquí",
    linkText: "Crear cuenta",
    linkHref: "/sign-up",
  },
  [EAuthModes.SIGN_UP]: {
    pageTitle: "Inicia Sesión",
    text: "¿Ya tienes una cuenta?",
    linkText: "Inicia sesión",
    linkHref: "/sign-in",
  },
};

type AuthHeaderProps = {
  type: EAuthModes;
};

export const AuthHeader = observer(function AuthHeader({ type }: AuthHeaderProps) {
  const { t } = useTranslation();
  // store
  const { config } = useInstance();
  // derived values
  const enableSignUpConfig = config?.enable_signup ?? false;
  return (
    <>
      <PageHead title={t(authContentMap[type].pageTitle) + " - Plane"} />
      <div className="flex items-center justify-between gap-6 w-full flex-shrink-0 sticky top-0">
        <Link href="/">
          <div className="flex items-center gap-2.5">
            <img src="/organizalo-logo.png" alt="Organizalo Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold tracking-tight text-custom-text-100">Organizalo</span>
          </div>
        </Link>
        {enableSignUpConfig && (
          <div className="flex flex-col items-end text-sm font-medium text-center sm:items-center sm:gap-2 sm:flex-row text-custom-text-300">
            {t(authContentMap[type].text)}
            <Link
              data-ph-element={AUTH_TRACKER_ELEMENTS.NAVIGATE_TO_SIGN_UP}
              href={authContentMap[type].linkHref}
              className="font-semibold text-custom-primary-100 hover:underline"
            >
              {t(authContentMap[type].linkText)}
            </Link>
          </div>
        )}
      </div>
    </>
  );
});
