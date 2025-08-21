import { useState } from "react";

export interface IParams {
  limit?: number;
  skip?: number;
  q?: string;
  select?: string | string[];
  sortBy?: string;
  order?: string;
}
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
