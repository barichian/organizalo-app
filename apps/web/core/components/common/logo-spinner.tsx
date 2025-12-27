import { useTheme } from "next-themes";
// assets
// assets
const OrganizaloLogo = "/organizalo-assets/favicon.png";

export function LogoSpinner() {
  return (
    <div className="flex items-center justify-center">
      <img src={OrganizaloLogo} alt="Organizalo" className="h-6 w-auto sm:h-11 object-contain animate-pulse" />
    </div>
  );
}
