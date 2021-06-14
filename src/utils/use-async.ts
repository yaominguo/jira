import { useState } from "react";

interface State<T> {
  error: Error | null;
  data: T | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<T>>({
    ...defaultInitialState,
    ...initialState,
  });
  const setData = (data: T) =>
    setState({
      stat: "success",
      data,
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      stat: "error",
      error,
      data: null,
    });

  const run = (promise: Promise<T>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入Promise类型数据");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((err) => {
        setError(err);
        if (config.throwOnError) {
          return Promise.reject(err);
        }
        return err;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
