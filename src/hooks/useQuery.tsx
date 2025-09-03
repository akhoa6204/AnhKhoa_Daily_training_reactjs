import { useState } from "react";
import type { Params } from "../interface/params";
export const defaultQuery = {
  limit: 8,
};
const useQuery = (params: Params) => {
  const [query, setQuery] = useState(params);
  const updateQuery = (newQuery: Params) =>
    setQuery((pre) => ({ ...pre, newQuery }));
  const resetQuery = () => setQuery({});
  return {
    query,
    updateQuery,
    resetQuery,
  };
};
export default useQuery;
