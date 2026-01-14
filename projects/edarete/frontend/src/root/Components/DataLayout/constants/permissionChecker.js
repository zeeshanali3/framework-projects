export const HasPermission = (permission, currentUserPermissions) => {
  if (!permission) {
    return true;
  }
  if (Array.isArray(permission)) {
    return permission?.some((perm) => currentUserPermissions?.includes(perm));
  }
  return currentUserPermissions?.includes(permission);
};