import { USER_TRACKER_ELEMENTS } from "@plane/constants";
import { useTranslation } from "@plane/i18n";
// ui
import { getButtonStyling } from "@plane/propel/button";
import { PlaneLogo } from "@plane/propel/icons";
// helpers
import { cn } from "@plane/utils";

export function ProductUpdatesFooter() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between flex-shrink-0 gap-4 m-6 mb-4">
      <div className="flex items-center gap-2">
        <a
          href="#"
          target="_blank"
          className="text-sm text-custom-text-200 hover:text-custom-text-100 hover:underline underline-offset-1 outline-none"
          rel="noreferrer"
        >
          {t("docs")}
        </a>
        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
          <circle cx={1} cy={1} r={1} />
        </svg>
        <a
          href="mailto:soporte@organizalo.app"
          target="_blank"
          className="text-sm text-custom-text-200 hover:text-custom-text-100 hover:underline underline-offset-1 outline-none"
          rel="noreferrer"
        >
          {t("support")}
        </a>
      </div>
      <a
        href="https://organizalo.app"
        target="_blank"
        className={cn(
          getButtonStyling("accent-primary", "sm"),
          "flex gap-1.5 items-center text-center font-medium hover:underline underline-offset-2 outline-none"
        )}
        rel="noreferrer"
      >
        <span>Organizalo.app</span>
      </a>
    </div>
  );
}
