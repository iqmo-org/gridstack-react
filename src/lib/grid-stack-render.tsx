import { createPortal } from "react-dom";
import { useGridStackContext } from "./grid-stack-context";
import { useGridStackRenderContext } from "./grid-stack-render-context";
import { GridStackWidgetContext } from "./grid-stack-widget-context";

export function GridStackRender(props: {
  componentMap: Record<string, React.FC<{ content: string }>>;
}) {
  const { _rawContentMap } = useGridStackContext();
  const { getWidgetContainer } = useGridStackRenderContext();

  return (
    <>
      {Array.from(_rawContentMap.value.entries()).map(([id, content]) => {
        const widgetContent = JSON.parse(content);
        const WidgetComponent = props.componentMap[widgetContent.component];

        const widgetContainer = getWidgetContainer(id);

        if (!widgetContainer) {
          throw new Error(`Widget container not found for id: ${id}`);
        }

        return (
          <GridStackWidgetContext.Provider key={id} value={{ widget: { id } }}>
            {createPortal(
              <WidgetComponent {...(widgetContent.props || {})} />,
              widgetContainer
            )}
          </GridStackWidgetContext.Provider>
        );
      })}
    </>
  );
}
