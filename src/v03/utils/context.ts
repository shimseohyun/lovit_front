import { createContext, useContext } from "react";

const createStrictContext = <T>(name: string) => {
  const ctx = createContext<T | null>(null);

  const useCTX = () => {
    const value = useContext(ctx);
    if (value === null) throw new Error(`${name} must be used within Provider`);
    return value;
  };

  return [ctx, useCTX] as const;
};

export default createStrictContext;
