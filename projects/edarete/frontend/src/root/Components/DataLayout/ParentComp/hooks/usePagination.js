import { useState, useCallback } from "react";

export const usePagination = ({
  initialPageSize = 10,
  paginationIsServerDriven,
  totalDataCount,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialPageSize);
  const [pagination, setPagination] = useState(
    paginationIsServerDriven ? "&page_size=10&page_no=1" : ""
  );
  const [queryParameters, setQueryParameters] = useState(
    paginationIsServerDriven ? pagination : ""
  );

  const handleChangePage = useCallback((event, newPage) => {
    if (newPage === page) return;

    const paginationQuery = `&page_size=${rowsPerPage}&page_no=${newPage + 1}`;

    setQueryParameters((prev) => {
      const preservedParams = prev
        .split("&")
        .filter((param) => !param.startsWith("page_"))
        .join("&");

      const updatedQuery = `${paginationQuery}${preservedParams ? `&${preservedParams}` : ""}`;

      return updatedQuery;
    });

    setPage(newPage);
    setPagination(paginationQuery);
  }, [page, rowsPerPage]);

  const handleChangeRowsPerPage = useCallback((event) => {
    const newSize = parseInt(event.target.value, 10);
    setRowsPerPage(newSize);
    setPage(0);

    const query = newSize === -1
      ? `&page_size=${totalDataCount || 999999}&page_no=1`
      : `&page_size=${newSize}&page_no=1`;

    setPagination(query);
    setQueryParameters(query);
  }, [totalDataCount]);

  const addSortingParams = useCallback((sortParams) => {
    const updatedParams = pagination + sortParams;
    setQueryParameters(updatedParams);
  }, [pagination]);

  const resetPagination = useCallback((defaultPageSize = 10) => {
    setRowsPerPage(defaultPageSize);
    setPagination(`&page_size=${defaultPageSize}&page_no=1`);
    setQueryParameters(`&page_size=${defaultPageSize}&page_no=1`);
    setPage(0);
  }, []);

  const totalPages = Math.ceil((totalDataCount || 0) / rowsPerPage) || 1;

  return {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    pagination,
    setPagination,
    queryParameters,
    setQueryParameters,
    handleChangePage,
    handleChangeRowsPerPage,
    addSortingParams,
    resetPagination,
    totalPages,
  };
};

export default usePagination;
