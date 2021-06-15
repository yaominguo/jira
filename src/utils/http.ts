import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { useCallback } from "react";
const BaseUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: { [key: string]: unknown };
}
export const http = async (
  url: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    url += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window.fetch(`${BaseUrl}/${url}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  return useCallback(
    (...[url, config]: Parameters<typeof http>) =>
      http(url, { ...config, token: user?.token }),
    [user?.token]
  );
};
