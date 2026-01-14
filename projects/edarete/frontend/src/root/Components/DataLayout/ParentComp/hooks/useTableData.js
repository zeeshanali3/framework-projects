import { useState, useEffect, useCallback } from "react";
import { getServerResponse } from "../../../Helpers/getServerResponse";
import serverCommunicationHelper from "../../constants/serverCommunicationHelper";
import { jsPDF } from "jspdf";
import { showSuccessToast, showErrorToast } from "../../../../Common/ToastUtils";
import generateFormProps from "../../constants/generateFormProps";

export const useTableData = ({
  data,
  config,
  listIsServerDriven,
  paginationIsServerDriven,
  filterIsServerDriven,
  sortIsServerDriven,
  searchIsServerDriven,
  rowActionsIsServerDriven,
  showSearchIcon,
  formValues,
  currentStep,
  sectionValue,
  params,
  pagination,
  queryParameters,
  searchQuery,
  rowsPerPage,
  page,
  lastParam,
  showForm,
  stepsLength,
  setFormValues,
  setData,
  setFilteredData,
  setMyUpdatedData,
  setTotalDataCount,
  setLocalFilteredDataCount,
  setIsLoading,
  setPagination,
  setRowsPerPage,
  setQueryParameters,
  setPage,
  currentUserPermissions,
}) => {
  const serverCommunication = listIsServerDriven
    ? serverCommunicationHelper(data?.features?.list?.serverCommunication)
    : {};

  // Fetch table data from server
  const getTableData = useCallback(async (qparam) => {
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

      setMyUpdatedData(updatedData);

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
    }

    serverCommunication.onSuccess = null;
    serverCommunication.onFailure = null;

    if (params) {
      serverCommunication.apiUrl = serverCommunication.apiUrl + params;
    }

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
  }, [
    listIsServerDriven,
    showSearchIcon,
    formValues,
    currentStep,
    stepsLength,
    sectionValue,
    params,
    data,
    serverCommunication,
    setFormValues,
    setData,
    setFilteredData,
    setMyUpdatedData,
    setTotalDataCount,
    setLocalFilteredDataCount,
    setIsLoading,
  ]);

  // Effect to fetch data on mount and when dependencies change
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
  ]);

  // Reset rowsPerPage when data source changes
  useEffect(() => {
    const defaultPageSize = data?.features?.pagination?.options?.pageSize || 10;
    setRowsPerPage(defaultPageSize);
    setPagination(`&page_size=${defaultPageSize}&page_no=1`);
    setQueryParameters(`&page_size=${defaultPageSize}&page_no=1`);
    setPage(0);
  }, [data?.features?.list?.serverCommunication?.apiUrl]);

  // Download PDF helper
  const downloadPDF = async (response, row) => {
    try {
      if (!response || typeof response !== "string") {
        throw new Error("Invalid HTML response from the server");
      }

      const pdf = new jsPDF("p", "pt", "a4");

      await pdf.html(response, {
        x: 20,
        y: 20,
        html2canvas: {
          scale: 1.2,
        },
        callback: (pdf) => {
          const fileName = `row_${row.id}_response.pdf`;
          pdf.save(fileName);
        },
      });
    } catch (error) {
      console.error("Error while generating or downloading PDF:", error);
    }
  };

  // Hit server for row actions
  const hitServer = async (action, row) => {
    if (action.name !== "Download PDF") {
      action.serverCommunication.onSuccess = async (res) => {
        await getTableData(pagination);
        showSuccessToast(
          res?.message || "Action Performed Successfully"
        );
      };
      action.serverCommunication.onFailure = (res) => {
        showErrorToast(res?.message || "Action Failed");
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
        onSuccess(response);
        downloadPDF(response, row);
      }

      action.serverCommunication.onSuccess = updatedOnSuccess;

      await getServerResponse(
        action.serverCommunication,
        "",
        row.id,
        setIsLoading
      );
    }
  };

  // Handle row action
  const handleRowAction = async (action, row, index, setShowForm, setCurrentAction, setSelectedRow) => {
    let formProps = null;
    if (action.form) {
      const formObj = await action.form;
      formProps = generateFormProps({
        ...formObj,
        apiActionType: formObj.apiActionType || "",
        requestType: formObj.requestType || "GET",
        apiUrl: formObj.apiUrl || "",
        additionAttributes: formObj.additionAttributes || {},
      });
    }
    const updatedAction = { ...action, form: formProps };

    // Handle import action
    if (action.name === "Import" || action.type === "import") {
      if (!action.serverCommunication && !action.importConfig) {
        showErrorToast("Import configuration is missing for this action");
        return;
      }
      setCurrentAction(action);
      setSelectedRow(row);
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
        action.onAction(row, index, row);
      } else {
        console.warn("Action not defined for ", action.name);
      }
    }
  };

  return {
    serverCommunication,
    getTableData,
    hitServer,
    handleRowAction,
    downloadPDF,
  };
};

export default useTableData;
