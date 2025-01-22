import { PropsWithChildren } from "react";
import { useGridStackRenderContext } from "./grid-stack-render-context";
import { createPortal } from "react-dom";
import { GridStackItemContext } from "./grid-stack-item-context";

export function GridStackItem(
  props: PropsWithChildren<{
    id: string;
  }>
) {
  const renderContext = useGridStackRenderContext();

  const widgetContainer = renderContext.getWidgetContainer(props.id);

  if (!widgetContainer) {
    return null;
  }

  return createPortal(
    <GridStackItemContext.Provider value={{ id: props.id }}>
      {props.children}
    </GridStackItemContext.Provider>,
    widgetContainer
  );
}
