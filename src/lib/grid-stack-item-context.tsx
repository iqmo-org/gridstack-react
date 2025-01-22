import { createContext, useContext } from "react";

export type GridStackItemContextType = {
  id: string;
};

export const GridStackItemContext = createContext<GridStackItemContextType>({
  id: "",
});

export function useGridStackItemContext() {
  return useContext(GridStackItemContext);
}
