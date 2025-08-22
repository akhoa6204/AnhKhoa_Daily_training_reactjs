import { useEffect, useState } from "react";
import type { AxiosRequestConfig } from "axios";
import httpClient from "../services/httpClient";
import type { Status } from "../interface/status";
import type { IParams } from "../interface/params";

interface IProps<TParams = IParams> {
  url: string;
  params?: TParams;
  config?: AxiosRequestConfig;
}
const useFetchList = ({ url, params, config }: IProps) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState<Status>("loading");
  const [hasSeeMore, setHasSeeMore] = useState(false);

  useEffect(() => {
    setStatus("loading");
    httpClient
      .get(url, {
        ...config,
        params,
      })
      .then((res) => {
        const items = Array.isArray(res?.data?.products)
          ? res.data.products
          : [];
        if (res.data.total > items.length) {
          setHasSeeMore(true);
        } else {
          setHasSeeMore(false);
        }
        setData(items);
        setStatus("success");
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setStatus("error");
      });
  }, [url, JSON.stringify(params)]);

  return { data, status, hasSeeMore };
};

export default useFetchList;
