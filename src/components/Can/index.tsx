import { ReactNode } from "react";
import useCan from "../../services/hooks/useCan";

interface CanProps {
  children: ReactNode;
  permissions?: string[];
  roles?: string[];
}

export default function Can({
  children,
  permissions = [],
  roles = [],
}: CanProps) {
  const hasPermission = useCan({ permissions, roles });
  if (hasPermission) {
    return <>{children}</>;
  } else {
    return null;
  }
}
