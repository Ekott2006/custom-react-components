import { QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const queryClient = new QueryClient();

export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}


export const BASE_URI = "http://localhost:8000/";
export type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
};
