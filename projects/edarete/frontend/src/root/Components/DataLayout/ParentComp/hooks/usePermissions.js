import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { HasPermission } from "../../constants/permissionChecker";

export const usePermissions = ({
  config,
  data,
  statusField,
  rowsPerPage,
  paginationIsServerDriven,
  setPagination,
  setPage,
  setSearchValue,
  setSearchQuery,
  setSearchOpen,
}) => {
  const { currentUserPermissions } = useSelector((state) => state.main);

  const [permissions, setPermissions] = useState({
    addActionPermission: false,
    filterActionPermission: false,
    searchActionPermission: false,
    sortActionPermission: false,
    exportActionPermission: false,
    importActionPermission: true,
    columnVisibilityPermission: false,
    userStatusUpdationPermission: false,
    tabsPermission: false,
  });

  useEffect(() => {
    const checkPermissions = () => {
      try {
        const addActionPermission = config?.features?.bulkAction?.permission
          ? HasPermission(
              data?.features?.bulkAction?.add?.permission,
              currentUserPermissions
            )
          : true;

        const columnVisibilityPermission = config?.features?.columnVisibility?.permission
          ? HasPermission(
              data?.features?.columnVisibility?.permission,
              currentUserPermissions
            )
          : false;

        const userStatusUpdationPermission =
          statusField && statusField.permission
            ? HasPermission(statusField.permissionName, currentUserPermissions)
            : false;

        const tabsPermission = config?.features?.tabs?.permission
          ? HasPermission(
              data?.features?.tabs?.permission,
              currentUserPermissions
            )
          : true;

        const filterActionPermission = config?.features?.filter?.permission
          ? HasPermission(
              data?.features?.filter?.permission,
              currentUserPermissions
            )
          : true;

        const searchActionPermission = config?.features?.search?.permission
          ? HasPermission(
              data?.features?.search?.permission,
              currentUserPermissions
            )
          : true;

        const sortActionPermission = config?.features?.sort?.permission
          ? HasPermission(
              data?.features?.sort?.permission,
              currentUserPermissions
            )
          : true;

        const exportActionPermission = config?.features?.export?.permission
          ? HasPermission(
              data?.features?.export?.permission,
              currentUserPermissions
            )
          : true;

        const importActionPermission = true;

        setPermissions({
          addActionPermission,
          filterActionPermission,
          searchActionPermission,
          sortActionPermission,
          exportActionPermission,
          importActionPermission,
          columnVisibilityPermission,
          userStatusUpdationPermission,
          tabsPermission,
        });

        setSearchValue("");
        setSearchQuery("");
        setSearchOpen(false);
      } catch (error) {
        console.error("Error checking permissions:", error);
      }
    };

    checkPermissions();
    if (paginationIsServerDriven) {
      setPagination("&page_size=10&page_no=1");
    }
    setPage(0);
  }, [
    currentUserPermissions,
    JSON.stringify(data?.features?.parameters?.fields),
    config,
    rowsPerPage,
  ]);

  return {
    permissions,
    currentUserPermissions,
  };
};

export default usePermissions;
