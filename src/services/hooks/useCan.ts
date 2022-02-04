import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import validatePermission from "../../utils/validatePermissions";

type useCanParams = {
  permissions?: string[];
  roles?: string[];
};

export default function useCan({ permissions, roles }: useCanParams) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return false;
  }

  return validatePermission(user, { permissions, roles });
}
