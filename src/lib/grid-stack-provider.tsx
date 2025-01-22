import type { GridStack, GridStackOptions, GridStackWidget } from "gridstack";
import { type PropsWithChildren, useCallback, useState } from "react";
import { GridStackContext } from "./grid-stack-context";

export function GridStackProvider({
  children,
  initialOptions,
}: PropsWithChildren<{ initialOptions: GridStackOptions }>) {
  const [gridStack, setGridStack] = useState<GridStack | null>(null);

  const addWidget = useCallback(
    (widget: GridStackWidget) => {
      gridStack?.addWidget(widget);
    },
    [gridStack]
  );

  const removeWidget = useCallback(
    (id: string) => {
      gridStack?.removeWidget(id);
    },
    [gridStack]
  );

  const saveOptions = useCallback(() => {
    return gridStack?.save(true, true, (_, widget) => widget);
  }, [gridStack]);

  return (
    <GridStackContext.Provider
      value={{
        initialOptions,

        addWidget,
        removeWidget,
        saveOptions,

        _gridStack: {
          value: gridStack,
          set: setGridStack,
        },
      }}
    >
      {children}
    </GridStackContext.Provider>
  );
}
