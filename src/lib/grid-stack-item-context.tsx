import { createContext, useContext } from "react";

export type GridStackItemContextType = {
  id: string;
  remove: () => void;
  getBounds: () => {
    current: {
      x: number | undefined;
      y: number | undefined;
      w: number | undefined;
      h: number | undefined;
    };
    original: {
      x: number | undefined;
      y: number | undefined;
      w: number | undefined;
      h: number | undefined;
    };
  } | null;
};

export const GridStackItemContext = createContext<GridStackItemContextType>({
  id: "",
  remove: () => {
    console.error("remove not implemented");
  },
  getBounds: () => {
    console.error("getBounds not implemented");
    return null;
  },
});

export function useGridStackItemContext() {
  const context = useContext(GridStackItemContext);

  if (!context) {
    throw new Error(
      "useGridStackItemContext must be used within a GridStackItemContext"
    );
  }

  return context;
}
