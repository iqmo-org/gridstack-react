import { PropsWithChildren, useLayoutEffect } from "react";
import { useGridStackContext } from "./grid-stack-context";
import { GridItemHTMLElement, Utils } from "gridstack";
import { DDElementHost } from "gridstack/dist/dd-element";
import { useGridStackItemContext } from "./grid-stack-item-context";
import { useGridStackRenderContext } from "./grid-stack-render-context";

// TODO: This is a temporary solution to forward the handle to the item.
export function GridStackItemHandleForwarder(props: PropsWithChildren) {
  const {
    _gridStack: { value: gridStack },
  } = useGridStackContext();
  const { id: widgetId } = useGridStackItemContext();
  const { getWidgetContainer } = useGridStackRenderContext();

  useLayoutEffect(() => {
    if (gridStack) {
      const widgetContainer = getWidgetContainer(widgetId);
      if (widgetContainer) {
        const element = Utils.getElement(
          widgetContainer.parentElement!
        ) as GridItemHTMLElement & DDElementHost;
        const node = element.gridstackNode;
        const ddElement = element.ddElement;
        if (node && ddElement) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          node._initDD = false;
          ddElement.cleanDraggable();
          ddElement.cleanDroppable();

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          gridStack?._prepareDragDropByNode(node);
        }
      }
    }
  }, [getWidgetContainer, gridStack, widgetId]);

  return <>{props.children}</>;
}
