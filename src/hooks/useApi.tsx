import { useCallback, useEffect, useRef, useState } from "react";
import type { Status } from "../interface/status";

type RequestFn<T> = (signal?: AbortSignal) => Promise<T>;

type Options<T> = {
  auto?: boolean;
  deps?: any[];
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (err: unknown) => void;
};

function useApi<T = unknown>(
  requestFn: RequestFn<T>,
  { auto = true, deps = [], initialData, onSuccess, onError }: Options<T> = {}
) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [error, setError] = useState<unknown>(null);
  const [status, setStatus] = useState<Status>(auto ? "loading" : "idle");

  const controllerRef = useRef<AbortController | null>(null);
  const requestRef = useRef<RequestFn<T>>(requestFn);

  useEffect(() => {
    requestRef.current = requestFn;
  }, [requestFn]);

  const run = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setStatus("loading");
    setError(null);

    try {
      const res = await requestRef.current(controller.signal);
      if (controller.signal.aborted) return;

      setData(res);
      setStatus("success");
      onSuccess?.(res);
      return res;
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(err);
      setStatus("error");
      onError?.(err);
      throw err;
    }
  }, []); // ✅ stable, không đổi giữa các render

  useEffect(() => {
    if (!auto) return;
    run();
    return () => controllerRef.current?.abort();
  }, [auto, run, ...deps]);

  const reset = useCallback(() => {
    controllerRef.current?.abort();
    setStatus("idle");
    setError(null);
    setData(initialData);
  }, [initialData]);

  return {
    data,
    error,
    status,
    refetch: run,
    setData,
    reset,
  } as const;
}

export default useApi;
