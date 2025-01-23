import { PropsWithChildren } from "react";
import { useGridStackItemContext } from "./lib/grid-stack-item-context";
import { GridStackHandleReInitializer, useGridStackContext } from "./lib";
import { newId } from "./utils";
import { CUSTOM_DRAGGABLE_HANDLE_CLASSNAME } from "./defaultGridOptions";
import { useComponentInfoMap } from "./ComponentsInfo";

export function ComplexCard(props: { title: string }) {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
}

export function ComplexCardEditableWrapper(
  props: PropsWithChildren<{
    serializableProps: { title: string };
  }>
) {
  const { id, remove, getBounds } = useGridStackItemContext();
  const { addWidget } = useGridStackContext();
  const { addComponentInfo } = useComponentInfoMap();

  return (
    <>
      {props.children}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          display: "flex",
          flexDirection: "row",
          gap: 4,
        }}
      >
        <button
          onClick={() => {
            const widgetId = newId();

            addWidget({
              id: widgetId,
              ...getBounds()?.current,
            });

            addComponentInfo(widgetId, {
              component: "ComplexCard",
              serializableProps: props.serializableProps,
            });
          }}
        >
          Duplicate
        </button>

        <button
          onClick={() => {
            console.log("removeWidget", id);
            remove();
          }}
        >
          Remove
        </button>
        <button>Edit (WIP)</button>

        <GridStackHandleReInitializer>
          <button
            style={{
              cursor: "move",
            }}
            className={CUSTOM_DRAGGABLE_HANDLE_CLASSNAME}
          >
            Move
          </button>
        </GridStackHandleReInitializer>
      </div>
    </>
  );
}
