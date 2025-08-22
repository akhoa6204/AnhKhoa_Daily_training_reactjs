import { useState } from "react";
import type { IParams } from "../interface/params";

const useQuery = (params: IParams) => {
  const [query, setQuery] = useState<IParams>(params);
  const updateQuery = (newQuery: IParams) => {
    setQuery((pre) => ({ ...pre, ...newQuery }));
  };
  const resetQuery = () => {
    setQuery({});
  };
  return { query, updateQuery, resetQuery };
};
export default useQuery;
