"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Building, Property, Unit } from "../types/app.types";

// 1. Define the shape of your context
interface StoreContextType<T> {
  sharedObject: T;
  setSharedObject: (obj: T) => void;
}

const StoreContext = createContext<StoreContextType<Unit|Building|Property> | undefined>(undefined);

export function StoreDataProvider({ children }: { children: ReactNode }) {
  const [sharedObject, setSharedObject] = useState<any>(null);

  return (
    <StoreContext.Provider value={{ sharedObject, setSharedObject }}>
      {children}
    </StoreContext.Provider>
  );
}

// Custom hook for easy access
export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStoreContext must be used within a DataProvider");
  return context;
};