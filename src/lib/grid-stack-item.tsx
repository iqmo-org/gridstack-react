import { PropsWithChildren, useCallback } from "react";
import { useGridStackRenderContext } from "./grid-stack-render-context";
import { createPortal } from "react-dom";
import { GridStackItemContext } from "./grid-stack-item-context";
import { useGridStackContext } from "./grid-stack-context";
import { GridItemHTMLElement } from "gridstack";

export function GridStackItem(
  props: PropsWithChildren<{
    id: string;
  }>
) {
  const renderContext = useGridStackRenderContext();
  const widgetContainer = renderContext.getWidgetContainer(props.id);

  const { removeWidget } = useGridStackContext();

  const remove = useCallback(() => {
    if (widgetContainer?.parentElement) {
      removeWidget(widgetContainer.parentElement as GridItemHTMLElement);
    }
  }, [removeWidget, widgetContainer?.parentElement]);

  const getBounds = useCallback(() => {
    const parentNode = widgetContainer?.parentElement;
    if (parentNode) {
      const widgetNode = parentNode as GridItemHTMLElement;
      if (widgetNode.gridstackNode) {
        const gridstackNode = widgetNode.gridstackNode;
        return {
          current: {
            x: gridstackNode.x,
            y: gridstackNode.y,
            w: gridstackNode.w,
            h: gridstackNode.h,
          },
          original: {
            x: gridstackNode.x,
            y: gridstackNode.y,
            w: gridstackNode.w,
            h: gridstackNode.h,
          },
        };
      }
    }
    return null;
  }, [widgetContainer?.parentElement]);

  if (!widgetContainer) {
    return null;
  }

  return createPortal(
    <GridStackItemContext.Provider value={{ id: props.id, remove, getBounds }}>
      {props.children}
    </GridStackItemContext.Provider>,
    widgetContainer
  );
}
