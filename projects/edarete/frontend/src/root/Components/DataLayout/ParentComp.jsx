import React, { useEffect, useState, useCallback } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Typography,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { styled, alpha } from "@mui/material/styles";
import SortData from "./SortData";
import Grids from "./Grid";
import InputBase from "@mui/material/InputBase";
import ExportDropdown from "./ExportList";
import ListViewDropdown from "./ListViewMode";
import TableView from "./TableView";
import FilterComponent from "./FilterComponent/index";
import AddIcon from "@mui/icons-material/Add";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MoreHoriz } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { Form } from "../Form/Form";
import { flattenFieldsFromSteps } from "./parametersParser";
import { HasPermission } from "./constants/permissionChecker";
import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import ImportList from "./ImportList";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import SpeedDialComponent from "./SpeedDial";
import CardView from "./CardView";
import { Tabs, Tab } from "@mui/material";
import { tabsClasses } from "@mui/material/Tabs";
import TableSkeleton from "./TableSkeleton";
import { getServerResponse } from "../Helpers/getServerResponse";
import serverCommunicationHelper from "./constants/serverCommunicationHelper";
import { showSuccessToast, showErrorToast } from "../../Common/ToastUtils";
import { useLocation, useNavigate } from "react-router-dom";
import generateFormProps from "./constants/generateFormProps";
let colorBase = "#FFFFFF";
let colorBaseDark = "#40404F";
// let colorBaseDarkText = "#C7C6FF";
// let colorBaseText = "#260143";
let colorBaseDarkText = "#fff";
let colorBaseText = "#000000";
// const colorMain = alpha(colorBase);

async function updateUserStatus({
  userId,
  apiUrl,
  fullUser,
  actionPerformerURDD,
  onSuccess,
  onFailure,
}) {
  const config = serverCommunicationHelper({
    apiActionType: "Update",
    requestType: "PUT",
    apiUrl: apiUrl,
    body: {
      ...fullUser, // send all fields
      // users_status: newStatus,
      ...(actionPerformerURDD && { actionPerformerURDD }),
    },
    onSuccess,
    onFailure,
  });
  const queryParam = `?id=${userId}`;
  try {
    const response = await getServerResponse(config, queryParam);
    if (onSuccess) onSuccess(response);
  } catch (err) {
    if (onFailure) onFailure(err);
  }
}

const Search = styled("div")(({ theme, open }) => ({
  position: "relative",
  // borderRadius: theme.shape.borderRadius,
  backgroundColor: open
    ? alpha(theme.palette.common.white, 0.15)
    : "transparent",
  "&:hover": {
    backgroundColor: open
      ? alpha(theme.palette.common.white, 0.25)
      : "transparent",
  },
  marginLeft: 0,
  display: "flex",
  alignItems: "center",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shortest,
  }),
  width: open ? "250px" : "40px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme, open }) => ({
  color: "inherit",
  width: open ? "100%" : "0px",
  opacity: open ? 1 : 0,
  transition: theme.transitions.create(["width", "opacity"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shortest,
  }),
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

export default function ParentComp({
  CustomCard,
  data,
  config,
  appearance,
  formValues,
  setFormValues,
  setUpdatedDataFromList,
  showSearchIcon,
  sectionValue,
  currentStep,
  params = null,
  isTableOfField,
}) {
  let stepsLength = formValues?.length;
  const location = useLocation();
  const navigate = useNavigate();
  const appTheme = useTheme(); // Get the current theme from MUI
  const isDarkMode = appTheme.palette.mode === "dark";
  const mode = isDarkMode ? "dark" : "light";

  const themeStyles = appearance?.[mode]?.grid || {};
  const lightHeaderTitleColor = isDarkMode
    ? "#fff"
    : appTheme?.customTokens?.light?.table?.header?.headerTextColor ||
    "#000000";

  // Define theme-based text colors from appearance or fallback to defaults
  const textColor =
    themeStyles?.cardFont?.heading || (isDarkMode ? "#c7c6ff" : "#260143");
  const secondaryTextColor =
    themeStyles?.cardFont?.color || (isDarkMode ? "#a5a4c4" : "#5a5897");

  const paramsArray = location.pathname.substring(1).split("&").slice(1);
  const lastParam = paramsArray.length > 0 ? `&${paramsArray.join("&")}` : "";

  const parametersArray =
    flattenFieldsFromSteps(data?.features?.parameters)?.steps?.map((step) => ({
      fields: step?.parameters?.fields,
    })) || data?.features?.parameters;
  // console.warn("parameters", parametersArray);
  const fields = parametersArray[0]?.fields || [];
  const statusField = fields.find((field) => field && field.name === "status");
  let temp = {
    ...data,
    features: {
      ...data?.features,
      parameters: Array.isArray(parametersArray)
        ? parametersArray[0] || {}
        : parametersArray,
    },
  };
  data = temp;
  const listIsServerDriven =
    config?.features?.list?.operationalMode == "server" ? true : false;
  const rowActionsIsServerDriven =
    config?.features?.rowActions?.operationalMode == "server" ? true : false;
  const exportIsServerDriven =
    config?.features?.export?.operationalMode == "server" ? true : false;
  const filterIsServerDriven =
    config?.features?.filter?.operationalMode == "server" ? true : false;
  const sortIsServerDriven =
    config?.features?.sort?.operationalMode == "server" ? true : false;
  const searchIsServerDriven =
    config?.features?.search?.operationalMode == "server" ? true : false;
  const paginationIsServerDriven =
    config?.features?.pagination?.operationalMode == "server" ? true : false;
  const bulkActionIsServerDriven =
    config?.features?.bulkActions?.operationalMode == "server" ? true : false;

  const serverCommunication = listIsServerDriven
    ? serverCommunicationHelper(data?.features?.list?.serverCommunication)
    : {};

  const [myUpdatedData, setMyUpdatedData] = useState(data);
  const [rowActionsConfig, setRowActionsConfig] = useState(data?.features?.rowActionsConfig);

  const [page, setPage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState({});
  const [selectedRow, setSelectedRow] = useState({});
  const { currentUserPermissions } = useSelector((state) => state.main);
  const [searchValue, setSearchValue] = useState("");
  const [parameterData, setData] = useState(
    listIsServerDriven
      ? data?.features?.list?.data || []
      : data?.features?.list?.data
  );
  const [filteredData, setFilteredData] = useState(
    data?.features?.list?.data || []
  );
  const [bulkActionArray, setbulkActionArray] = useState([]);
  const [speedDialerActions, setSpeedDialerActions] = useState({});
  const [viewMode, setViewMode] = useState(
    config?.viewMode?.presentation[0] || ""
  );
  const [rowsPerPage, setRowsPerPage] = useState(
    data?.features?.pagination?.options?.pageSize || 10
  );
  const [pagination, setPagination] = useState(
    paginationIsServerDriven ? "&page_size=10&page_no=1" : ""
  );
  const [queryParameters, setQueryParameters] = useState(
    paginationIsServerDriven ? pagination : ""
  );
  const [totalDataCount, setTotalDataCount] = useState(
    data?.features?.list?.data?.length || 0
  );
  const [localFilteredDataCount, setLocalFilteredDataCount] = useState(
    data?.features?.list?.data?.length || 0
  );
  const [isLoading, setIsLoading] = useState(false);
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
  const [localDataFromForm, setLocalDataFromForm] = useState([]);
  // const [selectedValues, setSelectedValues] = useState([]);
  const expandAbleRow = config?.features?.expandableRow?.enable;
  const dragAndDrop = config?.features?.dragAndDrop?.enable;
  const rowActions = config?.features?.rowActions?.enable;
  const userStatusUpdation = config?.features?.userStatusUpdation?.enable;
  const columnVisibility = config?.features?.columnVisibility?.enable;
  const speedDial = config?.features?.speedDial?.enable == false ? false : true;
  const bulkActions =
    config?.features?.bulkAction?.enable == true ? true : false;

  const [preventEffect, setPreventEffect] = useState(false);

  const filter = data?.features?.tabs || {};
  const buttons = [
    { value: "all", label: "All", field: null },
    ...(filter.options || []).map((opt) => ({
      ...opt,
      field: filter.alias || null, // or use a default field name
    })),
  ];
  const [tabIndex, setTabIndex] = useState("All");

  const haveSearchPermission =
    config?.features?.search?.enable && permissions.searchActionPermission
      ? true
      : false;

  // Debug import configuration on mount
  useEffect(() => {
    console.log("=== IMPORT CONFIGURATION DEBUG ===");
    console.log("1. data.features.import:", data?.features?.import);
    console.log("2. import.serverCommunication:", data?.features?.import?.serverCommunication);
    console.log("3. data.features.bulkAction:", data?.features?.bulkAction);
    console.log("4. bulkAction.add.serverCommunication:", data?.features?.bulkAction?.add?.serverCommunication);
    console.log("5. bulkAction.add.form:", data?.features?.bulkAction?.add?.form);
    console.log("6. Full data.features keys:", Object.keys(data?.features || {}));

    // Check which path will be used for import
    const importConfig = data?.features?.import?.serverCommunication ||
      data?.features?.bulkAction?.add?.serverCommunication ||
      data?.features?.bulkAction?.add?.form?.data?.features?.submission?.serverCommunication ||
      data?.features?.submission?.serverCommunication ||
      null;

    console.log("7. RESOLVED Import Config:", importConfig);
    console.log("8. Has valid apiUrl?", !!importConfig?.apiUrl);
    console.log("==================================");
  }, []);

  useEffect(() => {
    if (preventEffect) {
      setPreventEffect(false);
      return;
    }
    const search = window.location.href.split("&").slice(1).join("&"); // get query params
    const params = new URLSearchParams(search);

    const rawColumn = params.get("filter_columns_and");
    const rawValue = params.get("filter_values_and");

    if (!rawColumn || !rawValue) {
      // No filters => Reset to "All"
      setTabIndex("All");
      // setSelectedValues([{ value: "all", label: "All", field: null }]);
      return;
    }

    try {
      const columnArr = JSON.parse(rawColumn);
      const valueArr = JSON.parse(rawValue);

      const selectedButton = buttons.find(
        (btn) => btn.field === columnArr[0] && btn.value === valueArr[0]
      );

      if (selectedButton) {
        setTabIndex(selectedButton.label);
        // setSelectedValues([selectedButton]);
      } else {
        setTabIndex("All");
        // setSelectedValues([{ value: "all", label: "All", field: null }]);
      }
    } catch (e) {
      console.warn("Failed to parse filter params:", e);
      setTabIndex("All");
      // setSelectedValues([{ value: "all", label: "All", field: null }]);
    }
  }, [location.pathname + location.search]);

  useEffect(() => {
    if (!localDataFromForm || Object.keys(localDataFromForm).length === 0) {
      return;
    }
    setFilteredData((prev) => {
      const existingIndex = prev?.findIndex(
        (item) => item.id === selectedRow?.id
      );

      let updatedArray;

      if (existingIndex !== -1) {
        // ✅ Update existing entry
        updatedArray = [...prev];
        updatedArray[existingIndex] = {
          ...localDataFromForm,
          id: selectedRow.id,
        };
      } else {
        // ✅ Add as new entry with next ID
        updatedArray = [...prev, { ...localDataFromForm, id: prev.length + 1 }];
      }

      const updatedData = {
        ...data,
        features: {
          ...data.features,
          list: {
            ...data.features.list,
            data: updatedArray,
          },
        },
      };

      setData(updatedArray);
      setMyUpdatedData(updatedData);

      setUpdatedDataFromList(updatedData?.features?.list?.data);
      setTotalDataCount(updatedArray.length || 1);
      setLocalFilteredDataCount(updatedArray.length || 1);
      return updatedArray;
    });
  }, [localDataFromForm, rowsPerPage, page]);

  useEffect(() => {
    const checkPermissions = () => {
      try {
        const addActionPermission = config?.features?.bulkAction?.permission
          ? HasPermission(
            data?.features?.bulkAction?.add?.permission,
            currentUserPermissions
          )
          : true;
        const columnVisibilityPermission = config?.features?.columnVisibility
          ?.permission
          ? HasPermission(
            data?.features?.columnVisibility?.permission,
            currentUserPermissions
          )
          : false;

        // checking user permission
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
    JSON.stringify(data.features?.parameters?.fields),
    config,
    rowsPerPage,
  ]);

  useEffect(() => {
    if (!listIsServerDriven || !serverCommunication) {
      return;
    }

    let query = pagination;
    if (paginationIsServerDriven && searchQuery === "") {
      query = queryParameters.includes("filter_columns")
        ? queryParameters
        : pagination;
    } else if (
      queryParameters !== pagination &&
      (filterIsServerDriven || sortIsServerDriven) &&
      searchQuery != ""
    ) {
      query = queryParameters;
    } else if (searchIsServerDriven && searchQuery !== "") {
      query = pagination + searchQuery;
    }

    getTableData(lastParam + query);
    if (paginationIsServerDriven) {
      if (rowsPerPage != -1) {
        setPagination(`&page_size=${rowsPerPage}&page_no=1`);
      }
    }
  }, [
    serverCommunication?.apiUrl,
    queryParameters,
    searchQuery,
    rowsPerPage,
    page,
    location,
  ], [showForm]);

  // Add effect to reset rowsPerPage when data source changes
  useEffect(() => {
    const defaultPageSize = data?.features?.pagination?.options?.pageSize || 10;
    setRowsPerPage(defaultPageSize);
    setPagination(`&page_size=${defaultPageSize}&page_no=1`);
    setQueryParameters(`&page_size=${defaultPageSize}&page_no=1`);
    setPage(0);
  }, [data?.features?.list?.serverCommunication?.apiUrl, location.pathname]);

  const updateActionState = async (state) => {
    setShowForm(state);
    if (state === false) {
      setCurrentAction(null);
      // Reset to default page size when closing form/modal
      if (rowsPerPage === -1) {
        const defaultPageSize = data?.features?.pagination?.options?.pageSize || 10;
        setRowsPerPage(defaultPageSize);
        setPagination(`&page_size=${defaultPageSize}&page_no=1`);
        setQueryParameters(`&page_size=${defaultPageSize}&page_no=1`);
      }
      // Only fetch list after Add API completes
      if (HasPermission(data?.features?.list?.permission, currentUserPermissions)) {
        await getTableData(pagination);
      }
    }
  };

  const addSortingParams = (sortParams) => {
    const updatedParams = pagination + sortParams;
    setQueryParameters(updatedParams);
  };
  const getTableData = async (qparam) => {
    if (
      !listIsServerDriven ||
      (showSearchIcon === "create" &&
        formValues &&
        !formValues[currentStep - 1]?.insertedId)
    ) {
      return;
    }

    setIsLoading(true);

    function updatedOnSuccess(res) {
      // Support both 'return' and 'data' keys for list data
      const listData = Array.isArray(res.return)
        ? res.return
        : Array.isArray(res.data)
          ? res.data
          : [];

      const temp = [];
      for (let i = 0; i < stepsLength; i++) {
        temp.push(listData[i] || listData[0]);
      }
      if (sectionValue) {
        setFormValues(temp);
      }
      setData(listData);
      setFilteredData(listData);
      const updatedData = {
        ...data,
        features: {
          ...data.features,
          list: {
            ...data.features.list,
            data: listData,
          },
        },
      };
      console.log("List Data from server:", listData);
      setMyUpdatedData(updatedData);
      // console.warn("Updated Data", res);
      if (listIsServerDriven) {
        setTotalDataCount(
          res?.total_count != 0
            ? res?.total_count
            : listData[0]?.table_count || listData?.length || 1
        );
        setLocalFilteredDataCount(
          res?.total_count != 0
            ? res?.total_count
            : listData[0]?.table_count || listData?.length || 1
        );
      } else {
        setTotalDataCount(listData?.length);
        setLocalFilteredDataCount(res?.total_count || listData?.length || 1);
      }
      setIsLoading(false);
    }

    function updatedOnFailure(err) {
      console.error("Error from Table comp", err);
      const updatedData = {
        ...data,
        features: {
          ...data.features,
          list: {
            ...data.features.list,
            data: [],
          },
        },
      };
      setMyUpdatedData(updatedData);
      setFilteredData([]);
      setIsLoading(false);
      // onFailure();
    }
    serverCommunication.onSuccess = null;
    serverCommunication.onFailure = null;
    // Assign the callbacks
    if (params) {
      serverCommunication.apiUrl = serverCommunication.apiUrl + params;
    }
    console.log("qparam::", serverCommunication.apiUrl);

    serverCommunication.onSuccess = updatedOnSuccess;
    serverCommunication.onFailure = updatedOnFailure;
    if (sectionValue) {
      await getServerResponse(
        serverCommunication,
        `&step=${currentStep}`,
        sectionValue,
        setIsLoading
      );
    } else {
      await getServerResponse(
        serverCommunication,
        qparam,
        (formValues && formValues[currentStep - 1]?.insertedId) || null,
        setIsLoading
      );
    }
  };

  const updateDataLocaly = (action, row, index) => {
    setCurrentAction(action);
    if (action.name === "Delete") {
      const updatedData = parameterData?.filter((item) => item.id !== row.id);

      setData(updatedData);
      setFilteredData(updatedData);
      setUpdatedDataFromList(updatedData);
      action.onAction(row);
    } else {
      setShowForm(true);
      action.onAction(row);
    }
  };
  const handleRowAction = async (action, row, index) => {
    let formProps = null;
    if (action.form) {
      const formObj = await action.form;
      console.log("formObj", formObj);
      formProps = generateFormProps({
        ...formObj,
        apiActionType: formObj.apiActionType || "",
        requestType: formObj.requestType || "GET",
        apiUrl: formObj.apiUrl || "",
        additionAttributes: formObj.additionAttributes || {},
      });
    }
    const updatedAction = { ...action, form: formProps };
    console.log("updatedAction", {action,updatedAction});
    
    // Handle import action - pass the complete action with serverCommunication
    if (action.name === "Import" || action.type === "import") {
      console.log("Import action detected:", action);
      console.log("Import serverCommunication:", action.serverCommunication);
      
      if (!action.serverCommunication && !action.importConfig) {
        showErrorToast("Import configuration is missing for this action");
        return;
      }
      
      setCurrentAction(action); // Pass original action with serverCommunication
      setSelectedRow(row);
      // Import action will be handled in ActionButtons component
      return;
    }

    if (updatedAction.form) {
      setShowForm(true);
      setCurrentAction(updatedAction);
      setSelectedRow(row);
    } else {
      if (action.serverCommunication) {
        hitServer(action, row);
      } else if (action.onAction) {
        // Pass row data with quizId for socket communication
        action.onAction(row, index, row);
      } else {
        console.warn("Action not defined for ", action.name);
      }
    }
  };

  const hitServer = async (action, row) => {
    if (action.name !== "Download PDF") {
      action.serverCommunication.onSuccess = async (res) => {
        await getTableData(pagination);

        showSuccessToast(
          res?.message || "Action Performed IN HITSERVER FUNCTION  Successfully"
        );
      };
      action.serverCommunication.onFailure = (res) => {
        showErrorToast(res?.message || "Action Performed Successfully");
      };
      if (sectionValue) {
        await getServerResponse(
          action.serverCommunication,
          `&step=${currentStep > 0 ? currentStep + 1 : currentStep}`,
          row.id,
          setIsLoading
        );
      } else {
        await getServerResponse(
          action.serverCommunication,
          "",
          row.id,
          setIsLoading
        );
      }
    } else {
      const onSuccess = action.serverCommunication.onSuccess;

      function updatedOnSuccess(response) {
        setSelectedRow({});
        onSuccess(response); // Call the original onSuccess function
        downloadPDF(response, row); // Call downloadPDF with the response and row
      }

      // Update the action's onSuccess to the new function
      action.serverCommunication.onSuccess = updatedOnSuccess;

      // Trigger the server call
      await getServerResponse(
        action.serverCommunication,
        "",
        row.id,
        setIsLoading
      );
    }
  };
  const downloadPDF = async (response, row) => {
    try {
      // Ensure the response is in HTML format
      if (!response || typeof response !== "string") {
        throw new Error("Invalid HTML response from the server");
      }

      // Step 2: Create a jsPDF instance
      const pdf = new jsPDF("p", "pt", "a4"); // Portrait, points, A4 size

      // Step 3: Add HTML content to the PDF
      await pdf.html(response, {
        x: 20, // Left margin
        y: 20, // Top margin
        html2canvas: {
          scale: 1.2, // Adjust scaling for better quality
        },
        callback: (pdf) => {
          // Step 4: Save the PDF file
          const fileName = `row_${row.id}_response.pdf`;
          pdf.save(fileName);
        },
      });
    } catch (error) {
      console.error("Error while generating or downloading PDF:", error);
    }
  };

  const handleClickAddButton = async () => {
    if (data?.features?.bulkAction?.add?.form) {
      const addForm = data?.features?.bulkAction?.add?.form;
      const formProps = generateFormProps({
        ...addForm,
        apiActionType: addForm.apiActionType || "",
        requestType: addForm.requestType || "POST",
        apiUrl: addForm.apiUrl || "",
        additionAttributes: addForm.additionAttributes || {},
        // Add a callback to fetch list after add
        onSuccess: async () => {
          await getTableData(pagination);
        }
      });
      setCurrentAction({ form: formProps });
      setSelectedRow({});
      setShowForm(true);
    }
  };
  // Adjusted filtering logic to exclude certain keys
  const searchedData = (filteredData || []).filter(
    (item) =>
      item &&
      Object.keys(item).some((key) => {
        if (data?.search?.excludeSearch?.includes(key)) return false;
        const val = item[key];
        const normalizedVal = val ? String(val).toLowerCase() : "";
        return normalizedVal.includes(searchQuery?.toLowerCase() || "");
      })
  );

  const paginatedData =
    paginationIsServerDriven || !paginationIsServerDriven
      ? filteredData
      : rowsPerPage === -1
        ? searchedData // No pagination, return all rows
        : searchedData?.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        );

  const handleSearchChange = useCallback(
    (event) => {
      const value = event.target.value;
      setSearchValue(value);
      if (searchIsServerDriven) {

        return;
      }

    },
    [searchIsServerDriven]
  );

  // --- Server-driven filter handler ---
  // Converts filter object to query string and updates queryParameters
  useEffect(() => {
    if (searchIsServerDriven) {
      // Server-driven search
      if (searchValue === "") {
        // If search is cleared, reset to original data
        setLocalFilteredDataCount(totalDataCount);
        setFilteredData(parameterData);
        setSearchQuery(""); // Clear any previous search query
        return;
      }

      // Build the server search query
      const newSearchQuery = `&filter_columns_or=${JSON.stringify(
        data?.search?.searchFields || ["all"]
      )}&filter_values_or=${JSON.stringify([searchValue])}`;

      setSearchQuery(newSearchQuery);
      setQueryParameters(pagination + newSearchQuery);
      setPage(0); // Reset to first page when searching
    } else {
      // Local search
      const timer = setTimeout(() => {
        if (searchValue === "") {
          setLocalFilteredDataCount(totalDataCount);
          setFilteredData(parameterData);
          return;
        }

        const localFilteredData = parameterData.filter((item) =>
          Object.keys(item).some((key) => {
            if (data?.search?.excludeSearch?.includes(key)) return false;
            const itemValue = item[key];
            return itemValue
              ? String(itemValue)
                .toLowerCase()
                .includes(searchValue.toLowerCase())
              : false;
          })
        );

        setLocalFilteredDataCount(localFilteredData?.length || 0);
        setFilteredData(localFilteredData);
        setPage(0); // Reset to first page when searching
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [
    searchValue,
    parameterData,
    totalDataCount,
    data?.search?.excludeSearch,
    data?.search?.searchFields,
    searchIsServerDriven,
    pagination,
  ]);
  const handleServerDrivenFilter = (filters) => {
    // Convert filters object to filter_columns and filter_values arrays
    const filterColumns = [];
    const filterValues = [];
    Object.entries(filters).forEach(([key, value]) => {
      if (
        value == null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      )
        return;
      // Use field name and dynamicKey instead of alias
      const field = myUpdatedData?.features?.parameters?.fields.find(
        (head) => head?.dynamicKey === key
      );
      filterColumns.push(field ? field.dynamicKey : key);
      filterValues.push(value);
    });

    const filterQuery = `&filter_columns_and=${JSON.stringify(
      filterColumns
    )}&filter_values_and=${JSON.stringify(filterValues)}`;
    // setPagination("&page_size=10&page_no=1");
    setQueryParameters(pagination + filterQuery);
    console.warn("pagination", pagination, "filterQ:", filterQuery);
    setPage(0);
  };
  const cleanQueryString = (queryString) => {
    const params = new URLSearchParams(queryString);
    const uniqueParams = {};

    params.forEach((value, key) => {
      if (!uniqueParams[key]) {
        uniqueParams[key] = value;
      }
    });

    return new URLSearchParams(uniqueParams).toString();
  };

  const handleChangePage = (event, newPage) => {
    if (newPage === page) return;

    // Create base pagination params
    const paginationQuery = `&page_size=${rowsPerPage}&page_no=${newPage + 1}`;

    setQueryParameters((prev) => {
      // Remove existing page params but keep everything else
      const preservedParams = prev
        .split("&")
        .filter((param) => !param.startsWith("page_"))
        .join("&");

      // Combine new pagination with preserved params
      const updatedQuery = `${paginationQuery}${preservedParams ? `&${preservedParams}` : ""
        }`;

      return updatedQuery;
    });

    setPage(newPage);
    setPagination(paginationQuery);
  };

  const handleChangeRowsPerPage = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setRowsPerPage(newSize);
    setPage(0);
    // When "All" is selected (-1), request all records using totalDataCount or a very large number
    const query = newSize === -1
      ? `&page_size=${totalDataCount || 999999}&page_no=1`
      : `&page_size=${newSize}&page_no=1`;
    setPagination(query);
    setQueryParameters(query);
  };

  // State for column visibility menu control
  const [columnVisibilityAnchorEl, setColumnVisibilityAnchorEl] =
    useState(null);
  const [columnVisibilityState, setColumnVisibilityState] = useState(null);

  // Handle column visibility menu
  const handleColumnVisibilityMenuOpen = (event) => {
    setColumnVisibilityAnchorEl(event.currentTarget);
  };

  const handleColumnVisibilityMenuClose = () => {
    setColumnVisibilityAnchorEl(null);
  };

  const renderView = () => {
    if (
      !filteredData ||
      (filteredData && filteredData?.length === 0) ||
      (filteredData?.length > 0 && filteredData[0]?.id == null)
    ) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 5,
            color: textColor,
          }}
        >
          <Typography variant="h6" sx={{ color: textColor }}>
            No results found
          </Typography>
        </Box>
      );
    }
    if (!filteredData[0].id) {
      return (
        <Typography variant="h6" sx={{ color: textColor }}>
          No unique Id available
        </Typography>
      );
    }
    switch (viewMode) {
      case "Card":
        return (
          <>
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <CardView
                CustomCard={CustomCard}
                dataProp={myUpdatedData}
                configProp={config}
                appearanceProp={appearance}
                dataFeatures={data?.features}
                additionalProp={{
                  data: paginatedData,
                  bulkActions: {
                    bulkActionArray: bulkActionArray,
                    setbulkActionArray: setbulkActionArray,
                  },
                }}
                onRowAction={handleRowAction}
                onUpdateRefreshData={
                  rowActionsIsServerDriven
                    ? () => getTableData()
                    : (action, row, index) =>
                      updateDataLocaly(action, row, index)
                }
                userStatusUpdationPermission={
                  permissions.userStatusUpdationPermission
                }
                isDarkMode={isDarkMode}
                themeStyles={themeStyles}
              />
            )}
          </>
        );
      case "Grid":
        return (
          <>
            {isLoading ? (
              <TableSkeleton /> 
            ) : (
              <Grids
                CustomCard={CustomCard}
                dataProp={myUpdatedData}
                configProp={config}
                appearanceProp={appearance}
                additionalProp={{
                  data: paginatedData,
                  bulkActions: {
                    bulkActionArray: bulkActionArray,
                    setbulkActionArray: setbulkActionArray,
                  },
                }}
                onRowAction={handleRowAction}
                onUpdateRefreshData={
                  rowActionsIsServerDriven
                    ? () => getTableData()
                    : (action, row, index) =>
                      updateDataLocaly(action, row, index)
                }
                isDarkMode={isDarkMode}
                themeStyles={themeStyles}
              />
            )}
          </>
        );
      case "Table":
        return (
          <>
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <>
                <TableView
                  key={page}
                  dataProp={myUpdatedData}
                  configProp={config}
                  filteredDataProp={filteredData}
                  appearanceProp={appearance}
                  enableCollapsibleRow={expandAbleRow}
                  enableDragAndDropFeature={dragAndDrop}
                  enableRowActions={rowActions}
                  enableColumnVisibility={columnVisibility}
                  enableUserStatusUpdation={userStatusUpdation}
                  additionalProp={{
                    data: paginatedData,
                    bulkActions: {
                      bulkActionArray: bulkActionArray,
                      setbulkActionArray: setbulkActionArray,
                    },
                    setColumnVisibilityState: setColumnVisibilityState,
                    // Pass import parameters to row actions
                    importParameters: data?.features?.parameters?.fields || [],
                    onStatusChange: (rowId, newValue) => {
                      const userRow = paginatedData.find((u) => u.id === rowId); // or whatever your row key is
                      if (!userRow) return;

                      // Build the full payload, updating only the status
                      const updatePayload = {
                        ...userRow,
                        users_status: newValue,
                      };
                      const statusApiUrl = statusField?.apiUrl;
                      updateUserStatus({
                        userId: rowId,
                        apiUrl: statusApiUrl,
                        fullUser: updatePayload, // pass the full user object
                        actionPerformerURDD: "admin",
                        onSuccess: (res) => {
                          setFilteredData((prev) =>
                            prev.map((user) =>
                              user.id === rowId
                                ? { ...user, users_status: newValue }
                                : user
                            )
                          );
                          // If you want to update parameterData as well:
                          // setParameterData((prev) =>
                          //   prev.map((user) =>
                          //     user.id === rowId ? { ...user, users_status: newValue } : user
                          //   )
                          // );
                          showSuccessToast("User status updated!");
                        },
                        onFailure: (err) => {
                          showErrorToast("Failed to update user status");
                        },
                      });
                    },
                    // Ensure id column is never hidden
                    alwaysVisibleColumns: ["id"],
                  }}
                  onRowAction={handleRowAction}
                  onUpdateRefreshData={
                    rowActionsIsServerDriven
                      ? () => getTableData()
                      : (action, row, index) => updateDataLocaly(action, row, index)
                  }
                  isDarkMode={isDarkMode}
                  textColor={textColor}
                  secondaryTextColor={secondaryTextColor}
                  themeStyles={themeStyles}
                  showSearchIcon={showSearchIcon}
                  externalMenuAnchorEl={columnVisibilityAnchorEl}
                  onExternalMenuOpen={handleColumnVisibilityMenuOpen}
                  onExternalMenuClose={handleColumnVisibilityMenuClose}
                  isMenuExternallyControlled={true}
                  userStatusUpdationPermission={permissions.userStatusUpdationPermission}
                  rowActionsConfig={rowActionsConfig}
                />
              </>
            )}
          </>
        );
      default:
        return <Typography variant="h6">Invalid view mode selected</Typography>;
    }
  };
  const isStandardColor = (color) =>
    ["inherit", "primary", "secondary", "default"].includes(color);

  const [anchorEl, setAnchorEl] = useState(null);

  // Handle opening and closing of the dropdown menu

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  // Calculate total number of pages for Pagination
  const totalPages = Math.ceil(localFilteredDataCount / rowsPerPage) || 1;
  // Build page size options with safe fallbacks and ensure the current rowsPerPage
  // is included to avoid MUI Select "out-of-range value" warnings when data is empty
  const _configuredPageSizeOptions =
    data?.features?.pagination?.options?.pageSizeOptions;
  let pageSizeOptions = Array.isArray(_configuredPageSizeOptions) &&
    _configuredPageSizeOptions.length > 0
    ? _configuredPageSizeOptions
    : [5, 10, 25, 50, 100, -1];

  // If there is no data, some callers expect a single option. Still, we must
  // include the current rowsPerPage value so the Select value is valid.
  if (parameterData && parameterData.length === 0) {
    // prefer keeping existing option set but ensure rowsPerPage present
    pageSizeOptions = Array.from(new Set([...(pageSizeOptions || []), rowsPerPage || 1]));
  } else {
    // Ensure rowsPerPage is present in options to avoid mismatch
    if (!pageSizeOptions.includes(rowsPerPage)) {
      pageSizeOptions = Array.from(new Set([...(pageSizeOptions || []), rowsPerPage]));
    }
  }


  // ActionMenu component for better readability
  function ActionMenu({
    anchorEl,
    handleMenuClose,
    isDarkMode,
    colorBaseDark,
    colorBase,
    config,
    permissions,
    data,
    filteredData,
    setFilteredData,
    sortIsServerDriven,
    addSortingParams,
  }) {
    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 3,
            minWidth: 180,
            padding: "8px 0",
            transition: "transform 0.2s ease",
            backgroundColor: isDarkMode ? colorBaseDark : colorBase,
          },
        }}
      >
        {/* Export */}
        {config?.features?.export?.enable &&
          permissions.exportActionPermission && (
            <MenuItem
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                padding: "1px 2px",
                color: isDarkMode ? colorBaseDarkText : colorBaseText,
              }}
            >
              <ExportDropdown
                headers={
                  config?.features?.export?.operationalMode === "server"
                    ? data?.features?.export?.serverCommunication?.data?.parameters?.steps?.[0]?.parameters?.fields?.[0]?.childFields || []
                    : data?.features?.parameters?.fields || []
                }
                data={
                  config?.features?.export?.operationalMode == "server"
                    ? [] // Server mode should handle export differently or provide actual data array
                    : filteredData || data?.features?.parameters?.data
                }
                formats={data?.features?.export?.options?.formats || []}
                includeHeaders={
                  data?.features?.export?.options?.includeHeaders || true
                }
                onSuccess={data?.features?.export?.onSuccess}
                onFailure={data?.features?.export?.onFailure}
                onAction={data?.features?.export?.onAction}
              />
            </MenuItem>
          )}
        {/* Import */}
        <MenuItem
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            padding: "1px 2px",
            color: isDarkMode ? colorBaseDarkText : colorBaseText,
          }}
        >
          {console.log("Import data", data?.features?.bulkAction?.add?.form?.data?.features?.submission?.serverCommunication)}
          <ImportList
            parameters={data?.features?.parameters?.fields || []}
            addSagaCommunication={
              data?.features?.bulkAction?.add?.form || null
            }
            onSuccess={() => { }}
            onFailure={() => { }}
          />
        </MenuItem>
        {/* Sort */}
        {config?.features?.sort?.enable && permissions.sortActionPermission && (
          <MenuItem
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              padding: "1px 2px",
              color: isDarkMode ? colorBaseDarkText : colorBaseText,
            }}
          >
            <SortData
              dataHeaders={data?.features?.parameters?.fields || []}
              data={filteredData || []}
              setData={!sortIsServerDriven ? setFilteredData : () => { }}
              isServerDriven={sortIsServerDriven}
              excludeSort={["image"]}
              buttonColor={isDarkMode ? "white" : "black"}
              options={data?.features?.sort?.options || {}}
              sx={{ mr: 2 }}
              onAction={
                sortIsServerDriven
                  ? (q) => addSortingParams(q)
                  : typeof data?.features?.sort?.onAction === "function"
                    ? data?.features?.sort?.onAction
                    : () => { }
              }
            />
          </MenuItem>
        )}
      </Menu>
    );
  }
  // Add more actions as needed

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue); // newValue is now a string like "Phone"
    console.warn("Selected Value:", newValue);
    const selectedButton = buttons.find((btn) => btn.label === newValue);
    console.warn("Selected bValue:", selectedButton);
    if (!selectedButton) return;

    console.warn("Selected bValue:", selectedButton);
    if (selectedButton.value === "all") {
      const cleanPath = window.location.pathname.split("&")[0];
      navigate(cleanPath);
    } else {
      const params = new URLSearchParams();
      params.set("filter_columns_and", JSON.stringify([selectedButton.field]));
      params.set("filter_values_and", JSON.stringify([selectedButton.value]));
      const cleanPath = window.location.pathname.split("&")[0];
      setPreventEffect(true);
      console.log("values of filter is :", `${cleanPath}&${params.toString()}`)
      navigate(`${cleanPath}&${params.toString()}`);
    }
    setPage(0);
    // setSelectedValues([selectedButton]);
  };
  const isAll = rowsPerPage === -1;
  const safeCount =
    localFilteredDataCount && !isNaN(localFilteredDataCount)
      ? localFilteredDataCount
      : 0;

  const startIndex = isAll
    ? safeCount > 0
      ? 1
      : 0
    : safeCount > 0
      ? Math.max(1, page * rowsPerPage + 1)
      : 0;

  const endIndex = isAll
    ? safeCount
    : safeCount > 0
      ? Math.min((page + 1) * rowsPerPage, safeCount)
      : 0;

  return (
    <ThemeProvider theme={appTheme}>
      <Box
        sx={{
          backgroundColor: isDarkMode ? colorBaseDark : colorBase,
          width: "100%",
          // minHeight: "80px",
          height: "auto",
          paddingY: "10px",
          paddingX: { xs: "20px", md: "30px" },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // backgroundColor: "red",
            flex: 1,
            minWidth: 0,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 200,
              color: lightHeaderTitleColor,
              pl: 2,
            }}
          >
            {data?.features?.headerTitle}
          </Typography>
          {config?.features?.tabs?.enable &&
            permissions.tabsPermission &&
            data?.features?.tabs?.options?.length > 0 && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on larger screens
                  alignItems: { sm: "center" },
                  gap: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{
                    pb: { xs: 1, sm: 0 },
                    width: { xs: "100%", sm: "auto" },
                    minWidth: "fit-content",
                    color: isDarkMode ? "#C7C6FF" : "#4C49ED",
                  }}
                >
                  {filter.label}:
                </Typography>

                <Box
                  sx={{
                    flexGrow: 1,
                    bgcolor: isDarkMode ? "#40404F" : "#FFFFFF",
                    px: { md: 2 },
                    width: { xs: "100%", sm: "50%" },
                    minWidth: { xs: "100%", md: "400px" }, // Minimum width constraints
                    maxWidth: { xs: "100%", md: "500px" }, // Maximum width constraints
                    alignItems: "center",
                  }}
                >
                  <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile={true}
                    aria-label="Filter Tabs"
                    sx={{
                      [`& .${tabsClasses.scrollButtons}`]: {
                        "&.Mui-disabled": { opacity: 0.3 },
                      },
                      "& .MuiTab-root": {
                        minHeight: "35px",

                        textTransform: "none",
                        fontWeight: "bold",
                        color: "#8d5795",
                        cursor: "pointer",

                        minWidth: "unset",

                        transition: "all 0.3s ease",
                        position: "relative",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },

                        borderRight: "1px solid rgba(0, 0, 0, 0.12)",

                        overflow: "visible",
                        "&.Mui-selected": {
                          color: "#4C49ED",
                        },
                        "&.Mui-selected::after": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 8,
                          right: 8,
                          fontWeight: "bold",
                          height: "2px",

                          borderRadius: "1px",
                        },
                        "&:hover": {
                          backgroundColor: "grey.100",
                        },
                      },
                    }}
                  >
                    {buttons.map((button) => (
                      <Tab
                        key={button.value}
                        label={button.label}
                        value={button.label}
                        sx={{
                          minHeight: "30px", // Smaller tab height
                        }}
                      />
                    ))}
                  </Tabs>
                </Box>
              </Box>
            )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // justifyContent: "flex-end",
            minWidth: { xs: "23%", sm: "20%", md: "14%", lg: "10%", xl: "8%" },
            // width: "100%",
            height: "70px",
            float: "right",
            // backgroundColor: "#4C49ED",
            // right: { xs: 10, sm: 0 },

            // zIndex: 2000,
          }}
        >
          {(bulkActions || speedDial) && (
            <FilterComponent
              // color={isDarkMode ? colorBaseDarkText : colorBaseText}
              bulkActions={speedDial}
              color={
                bulkActions
                  ? isDarkMode
                    ? colorBaseDarkText
                    : colorBaseText
                  : "white"
              }
              data={parameterData} // ⬅ only current page data
              setFilteredData={
                filterIsServerDriven
                  ? handleServerDrivenFilter
                  : (filteredPageData) => {
                    setFilteredData(filteredPageData);
                    setLocalFilteredDataCount(filteredPageData.length);
                    setPage(0);
                  }
              }
              onFilterApplied={() => {
                console.warn("Filter applied on current page");
              }}
              serverCommunucation={data?.features?.filter?.serverCommunication}
              parameterFields={parametersArray[0]?.fields || []}
              isServerDriven={filterIsServerDriven}
              filterBy={data?.features?.filter?.options?.filterBy}
              permission={data?.features?.filter?.permission}
              onAction={data?.features?.filter?.onAction}
              // search related props
              searchPermission={haveSearchPermission}
              searchIsServerDriven={searchIsServerDriven}
              handleSearchChange={handleSearchChange}
              searchValue={searchValue}
              setQueryParameters={setQueryParameters}
              page={page}
              rowsPerPage={rowsPerPage}
              setPagination={setPagination}
            />
          )}
          {speedDial && (
            <SpeedDialComponent
              config={config}
              data={data}
              filteredData={filteredData}
              viewMode={viewMode}
              setViewMode={setViewMode}
              showSearchIcon={showSearchIcon}
              permissions={permissions}
              isDarkMode={isDarkMode}
              colorBaseDarkText={colorBaseDarkText}
              colorBaseText={"white"}
              columnVisibility={columnVisibility}
              handleClickAddButton={handleClickAddButton}
              handleColumnVisibilityMenuOpen={handleColumnVisibilityMenuOpen}
              sortIsServerDriven={sortIsServerDriven}
              setFilteredData={setFilteredData}
              addSortingParams={addSortingParams}
            />
          )}

          {/* Optional view dropdown */}
          {bulkActions &&
            viewMode === "Table" &&
            permissions.columnVisibilityPermission && (
              <Tooltip title="Column Visibility">
                <IconButton
                  size="medium"
                  edge="start"
                  sx={{
                    color: "black",
                  }}
                  onClick={handleColumnVisibilityMenuOpen}
                  aria-label="Column Visibility"
                >
                  <ViewColumnIcon
                    sx={{
                      color: isDarkMode ? colorBaseDarkText : colorBaseText,
                      // ml: "5px",
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
          {bulkActions && permissions.addActionPermission && (
            <Tooltip title="Add">
              <IconButton
                size="medium"
                edge="start"
                sx={{
                  color: "black",
                }}
                onClick={handleClickAddButton}
                aria-label="Add"
              >
                <AddIcon
                  sx={{
                    color: isDarkMode ? colorBaseDarkText : colorBaseText,
                  }}
                />
              </IconButton>
            </Tooltip>
          )}
          {bulkActions &&
            config?.features?.viewMode?.presentation?.length > 1 && (
              <ListViewDropdown
                viewMode={viewMode}
                setListView={setViewMode}
                iconColor={"black"}
                presentation={config?.viewMode?.presentation}
              />
            )}

          {/* Optional More actions */}
          {bulkActions && (
            <>
              {bulkActions && (
                <Tooltip title="More actions">
                  <IconButton
                    aria-label="more"
                    size="medium"
                    edge="start"
                    color="black"
                    sx={{
                      color: "inherit",
                      size: "small",
                      transform: "rotate(90deg)",
                    }}
                  >
                    <MoreHoriz fontSize="medium" />
                  </IconButton>
                </Tooltip>
              )}

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                sx={{
                  "& .MuiPaper-root": {
                    borderRadius: 3,
                    minWidth: 180,
                    boxShadow: isDarkMode
                      ? "0px 6px 15px rgba(0, 0, 0, 0.3)"
                      : "0px 6px 15px rgba(0, 0, 0, 0.15)",
                    padding: "8px 0",
                    backgroundColor:
                      themeStyles?.header?.headColor ||
                      (isDarkMode ? "#1E1E2F" : "#ffffff"),
                  },
                }}
              >
                {config?.features?.export?.enable &&
                  permissions.exportActionPermission && (
                    <MenuItem
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        padding: "1px 2px",
                        color: themeStyles?.cardFont?.heading || textColor,
                      }}
                    >
                      <ExportDropdown
                        headers={
                          config?.features?.export?.operationalMode === "server"
                            ? data?.features?.export?.serverCommunication?.data?.parameters?.steps?.[0]?.parameters?.fields?.[0]?.childFields || []
                            : data?.features?.parameters?.fields || []
                        }
                        color={"black"}
                        speedDial={bulkActions}
                        data={
                          config?.features?.export?.operationalMode === "server"
                            ? [] // Server mode should handle export differently or provide actual data array
                            : filteredData || data?.features?.parameters?.data
                        }
                        formats={data?.features?.export?.options?.formats || []}
                        includeHeaders={
                          data?.features?.export?.options?.includeHeaders ??
                          true
                        }
                        onSuccess={data?.features?.export?.onSuccess}
                        onFailure={data?.features?.export?.onFailure}
                        onAction={data?.features?.export?.onAction}
                      />
                    </MenuItem>
                  )}
                {console.log("Import data in menu:", data?.features?.import)}
                <MenuItem
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    padding: "1px 2px",
                    // color: themeStyles?.cardFont?.heading || textColor,
                  }}
                >
                  <ImportList
                    color={isDarkMode ? "white" : "black"}
                    speedDial={bulkActions}
                    parameters={data?.features?.parameters?.fields || []}
                    addSagaCommunication={
                      // Only use serverCommunication if it has a valid apiUrl
                      (data?.features?.import?.serverCommunication?.apiUrl
                        ? data?.features?.import?.serverCommunication
                        : null)
                    }
                    onSuccess={(message) => {
                      console.log("Import success:", message);
                      showSuccessToast(message);
                      // Refresh the table data after successful import
                      if (listIsServerDriven && serverCommunication) {
                        getTableData(pagination);
                      }
                    }}
                    onFailure={(error) => {
                      console.error("Import failed:", error);
                      showErrorToast(error.message || "Import failed");
                    }}
                  />
                </MenuItem>

                {config?.features?.sort?.enable &&
                  permissions.sortActionPermission && (
                    <MenuItem
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        padding: "1px 2px",
                        color: themeStyles?.cardFont?.heading || textColor,
                      }}
                    >
                      <SortData
                        speedDial={bulkActions}
                        dataHeaders={data?.features?.parameters?.fields || []}
                        data={filteredData || []}
                        setData={
                          !sortIsServerDriven ? setFilteredData : () => { }
                        }
                        isServerDriven={sortIsServerDriven}
                        excludeSort={["image"]}
                        buttonColor={
                          isDarkMode ? colorBaseDarkText : colorBaseText
                        }
                        options={data?.features?.sort?.options || {}}
                        sx={{ mr: 2 }}
                        onAction={
                          sortIsServerDriven
                            ? (q) => addSortingParams(q)
                            : typeof data?.features?.sort?.onAction ===
                              "function"
                              ? data?.features?.sort?.onAction
                              : () => { }
                        }
                      />
                    </MenuItem>
                  )}
              </Menu>
            </>
          )}
        </Box>
      </Box>
      {/* </Toolbar> */}
      {/* </AppBar> */}

      <Box
        sx={{
          backgroundColor: isDarkMode ? colorBaseDark : colorBase,
          width: "100%",
          overflow:"hidden",

          // float: "left",
        }}
      >
        <Box sx={{}}>{renderView()}</Box>
      </Box>

      <AppBar
        position="static"
        sx={{
          backgroundColor: isDarkMode ? colorBaseDark : colorBase,
          boxShadow: "none",
        }}
        color={
          isStandardColor(appearance?.parent?.appBarColor)
            ? appearance?.parent?.appBarColor
            : undefined
        }
      >
        {config?.features?.pagination?.enable && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              px: { xs: 2, md: 4 },
              py: { xs: 2, md: 0 },
              mt: 2,
              mb: { xs: 2, md: 3 },
              flexWrap: "wrap",
              rowGap: 1,
            }}
          >
            {/* Custom Rows Per Page Selector */}
            <FormControl
              variant="standard"
              sx={{ minWidth: 120, mr: 2, border: "none" }}
              size="small"
            >
              <Select
                labelId="rows-per-page-label"
                id="rows-per-page"
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                label="Rows per page"
                sx={{
                  color: "#6B3FA0",
                  paddingLeft: 1,
                  paddingTop: 0.5,
                  fontWeight: 500,
                  backgroundColor: "#ECE2ED",
                  borderRadius: 1,
                  width: "50%",
                  "&:before": {
                    borderBottom: "none",
                  },
                  "&:after": {
                    borderBottom: "none",
                    // color: "#6B3FA0",
                  },
                  "& .MuiSelect-icon": {
                    color: isDarkMode ? "black" : "#6B3FA0",
                  },
                  "& .css-1q5epbe-MuiSelect-select-MuiInputBase-input-MuiInput-input":
                  {
                    color: isDarkMode ? "black" : "#6B3FA0",
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                    // Add other styles
                  },
                }}
              >
                {pageSizeOptions.map((option) => {
                  if (typeof option === "object" && option !== null) {
                    // option is { label, value }
                    return (
                      <MenuItem
                        sx={{
                          color: isDarkMode ? "#ffffff" : "#6B3FA0",
                        }}
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    );
                  } else {
                    // option is a number
                    return (
                      <MenuItem
                        sx={{
                          color: isDarkMode ? "#ffffff" : "#6B3FA0",
                        }}
                        key={option}
                        value={option}
                      >
                        {option === -1 ? "All" : option}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
              <InputLabel
                id="rows-per-page-label"
                sx={{
                  color: isDarkMode ? "#ffffff" : "#6B3FA0",
                  mt: 4.5,
                  "&.Mui-focused": {
                    color: isDarkMode ? "#ffffff" : "#6B3FA0",
                  },
                  "&.MuiInputLabel-shrink": {
                    color: isDarkMode ? "#ffffff" : "#6B3FA0",
                  },
                }}
              >
                Rows per page
              </InputLabel>
            </FormControl>
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontWeight: 500,
                color: isDarkMode ? "#ffffff" : "#6B3FA0",
                flex: 1,
                textAlign: "center",
              }}
            >
              Showing {startIndex}–{endIndex} of {safeCount} records
            </Typography>
            <Pagination
              count={totalPages}
              page={page + 1}
              onChange={(event, value) => handleChangePage(event, value - 1)}
              variant="outlined"
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
              showFirstButton={false}
              showLastButton={false}
              sx={{
                display: "flex",
                // flexDirection: "row-reverse",
                justifyContent: "end",
                mt: { xs: 4, sm: 0 },
                "& .MuiPaginationItem-root": {
                  borderRadius: "8px",
                  minWidth: "30px",
                  // height: "30px",
                  fontWeight: 500,
                  fontSize: "1rem",
                  color: "#6B3FA0", // your purple
                  borderColor: "#E0E0E0",
                  backgroundColor: "#ECE2ED",
                  "&.Mui-selected": {
                    backgroundColor: "#6B3FA0",
                    color: "#fff",
                    borderColor: "#6B3FA0",
                  },
                  "&.Mui-disabled": {
                    opacity: 0.4,
                  },
                },
                "& .MuiPagination-ul": {
                  justifyContent: "center",
                  gap: "8px",
                },
              }}
            />
          </Box>
        )}

        {showForm && (
          <Form
            data={currentAction?.form?.data}
            config={currentAction?.form?.config}
            appearance={currentAction?.form?.appearance}
            isModalOpen={showForm}
            setIsModalOpen={updateActionState}
            queryParamsId={selectedRow.id}
            localDataProp={selectedRow}
            setMyUpdatedData={setLocalDataFromForm}
            currentSteps={currentStep}
          />
        )}
      </AppBar>
    </ThemeProvider>
  );
}
