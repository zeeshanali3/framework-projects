import { useState, useEffect, useCallback } from "react";

export const useSearch = ({
  data,
  parameterData,
  totalDataCount,
  searchIsServerDriven,
  pagination,
  setFilteredData,
  setLocalFilteredDataCount,
  setPage,
  setQueryParameters,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchChange = useCallback((event) => {
    const value = event.target.value;
    setSearchValue(value);
    if (searchIsServerDriven) {
      return;
    }
  }, [searchIsServerDriven]);

  // Search effect
  useEffect(() => {
    if (searchIsServerDriven) {
      // Server-driven search
      if (searchValue === "") {
        setLocalFilteredDataCount(totalDataCount);
        setFilteredData(parameterData);
        setSearchQuery("");
        return;
      }

      const newSearchQuery = `&filter_columns_or=${JSON.stringify(
        data?.search?.searchFields || ["all"]
      )}&filter_values_or=${JSON.stringify([searchValue])}`;

      setSearchQuery(newSearchQuery);
      setQueryParameters(pagination + newSearchQuery);
      setPage(0);
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
        setPage(0);
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
    setFilteredData,
    setLocalFilteredDataCount,
    setPage,
    setQueryParameters,
  ]);

  // Get searched data for local filtering
  const getSearchedData = useCallback((filteredData) => {
    return (filteredData || []).filter(
      (item) =>
        item &&
        Object.keys(item).some((key) => {
          if (data?.search?.excludeSearch?.includes(key)) return false;
          const val = item[key];
          const normalizedVal = val ? String(val).toLowerCase() : "";
          return normalizedVal.includes(searchQuery?.toLowerCase() || "");
        })
    );
  }, [data?.search?.excludeSearch, searchQuery]);

  return {
    searchValue,
    setSearchValue,
    searchQuery,
    setSearchQuery,
    searchOpen,
    setSearchOpen,
    handleSearchChange,
    getSearchedData,
  };
};

export default useSearch;
