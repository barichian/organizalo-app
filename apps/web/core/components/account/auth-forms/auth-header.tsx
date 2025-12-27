import type { FC } from "react";
import { observer } from "mobx-react";
import useSWR from "swr";
import { useTranslation } from "@plane/i18n";
import type { IWorkspaceMemberInvitation } from "@plane/types";
// components
import { LogoSpinner } from "@/components/common/logo-spinner";
import { WorkspaceLogo } from "@/components/workspace/logo";
// helpers
import { EAuthModes, EAuthSteps } from "@/helpers/authentication.helper";
import { WorkspaceService } from "@/plane-web/services";
// services

type TAuthHeader = {
  workspaceSlug: string | undefined;
  invitationId: string | undefined;
  invitationEmail: string | undefined;
  authMode: EAuthModes;
  currentAuthStep: EAuthSteps;
};

const Titles = {
  [EAuthModes.SIGN_IN]: {
    [EAuthSteps.EMAIL]: {
      header: "Organiza tu vida y trabajo",
      subHeader: "Bienvenido a Organizalo",
    },
    [EAuthSteps.PASSWORD]: {
      header: "Organiza tu vida y trabajo",
      subHeader: "Bienvenido a Organizalo",
    },
    [EAuthSteps.UNIQUE_CODE]: {
      header: "Organiza tu vida y trabajo",
      subHeader: "Bienvenido a Organizalo",
    },
  },
  [EAuthModes.SIGN_UP]: {
    [EAuthSteps.EMAIL]: {
      header: "Organiza tu vida y trabajo",
      subHeader: "Crea tu cuenta en Organizalo",
    },
    [EAuthSteps.PASSWORD]: {
      header: "Organiza tu vida y trabajo",
      subHeader: "Crea tu cuenta en Organizalo",
    },
    [EAuthSteps.UNIQUE_CODE]: {
      header: "Organiza tu vida y trabajo",
      subHeader: "Crea tu cuenta en Organizalo",
    },
  },
};

const workSpaceService = new WorkspaceService();

export const AuthHeader = observer(function AuthHeader(props: TAuthHeader) {
  const { workspaceSlug, invitationId, invitationEmail, authMode, currentAuthStep } = props;
  // plane imports
  const { t } = useTranslation();

  const { data: invitation, isLoading } = useSWR(
    workspaceSlug && invitationId ? `WORKSPACE_INVITATION_${workspaceSlug}_${invitationId}` : null,
    async () => workspaceSlug && invitationId && workSpaceService.getWorkspaceInvitation(workspaceSlug, invitationId),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  const getHeaderSubHeader = (
    step: EAuthSteps,
    mode: EAuthModes,
    invitation: IWorkspaceMemberInvitation | undefined,
    email: string | undefined
  ) => {
    if (invitation && email && invitation.email === email && invitation.workspace) {
      const workspace = invitation.workspace;
      return {
        header: (
          <div className="relative inline-flex items-center gap-2">
            {t("common.join")}{" "}
            <WorkspaceLogo logo={workspace?.logo_url} name={workspace?.name} classNames="size-9 flex-shrink-0" />{" "}
            {workspace.name}
          </div>
        ),
        subHeader:
          mode == EAuthModes.SIGN_UP
            ? "Create an account to start managing work with your team."
            : "Log in to start managing work with your team.",
      };
    }

    return Titles[mode][step];
  };

  const { header, subHeader } = getHeaderSubHeader(currentAuthStep, authMode, invitation || undefined, invitationEmail);

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LogoSpinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-2 items-center text-center">
      <img src="/organizalo-logo.png" alt="Organizalo Logo" className="h-20 w-auto mb-4 object-contain" />
      <span className="text-xl font-semibold text-custom-text-100 leading-7">
        {typeof header === "string" ? "Organiza tu vida y trabajo" : header}
      </span>
      <span className="text-sm text-custom-text-400">{subHeader}</span>
    </div>
  );
});
