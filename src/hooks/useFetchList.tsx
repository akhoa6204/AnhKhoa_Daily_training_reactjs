import { useEffect, useState } from "react";
import type { AxiosRequestConfig } from "axios";
import httpClient from "../services/httpClient";
import type { IParams } from "./useQuery";

interface IProps<TParams = IParams> {
  url: string;
  params?: TParams;
  config?: AxiosRequestConfig;
}

const useFetchList = ({ url, params, config }: IProps) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasSeeMore, setHasSeeMore] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setIsError(false);
    setIsLoading(true);

    httpClient
      .get(url, {
        ...config,
        params,
        signal: controller.signal,
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
      })
      .catch((err: any) => {
        if (err?.name === "CanceledError" || err?.code === "ERR_CANCELED")
          return;
        console.error("Error fetching data:", err);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [url, JSON.stringify(params)]);

  return { data, isLoading, isError, hasSeeMore };
};

export default useFetchList;
