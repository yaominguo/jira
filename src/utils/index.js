import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !!value);

export const cleanObject = (obj) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    if (isFalsy(result[key])) delete result[key];
  });
  return result;
};

export const useMount = (callback) => {
  useEffect(() => callback(), []);
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
