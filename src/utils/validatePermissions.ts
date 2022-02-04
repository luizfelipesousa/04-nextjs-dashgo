type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type validatePermissionProps = {
  permissions: string[];
  roles: string[];
};

export default function validatePermission(
  user: User,
  { permissions, roles }: validatePermissionProps
): boolean {
  if (permissions?.length > 0) {
    const hasAllPermission = permissions.every((permission) => {
      return user.permissions.includes(permission);
    });

    if (!hasAllPermission) {
      return false;
    }
  }

  if (roles?.length > 0) {
    const hasRole = roles.some((role) => {
      return user.roles.includes(role);
    });

    if (!hasRole) {
      return false;
    }
  }

  return true;
}
