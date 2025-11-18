import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [debVal, setDebVal] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebVal(val), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debVal;
};

export const useState = (value) => {
  const setter = (newValue) => {
    value = newValue;
  };
  return [value, setter];
};
