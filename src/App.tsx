import { useState } from "react";

import "./demo.css";

import {
  GridStackHandleReInitializer,
  GridStackItem,
  GridStackProvider,
  GridStackRender,
} from "./lib";
import { GridStackOptions } from "gridstack";
import {
  CUSTOM_DRAGGABLE_HANDLE_CLASSNAME,
  defaultGridOptions,
} from "./default-grid-options";
import { COMPONENT_MAP, ComponentInfo } from "./component-map";
import { ComplexCardEditableWrapper } from "./components/complex-card";
import {
  ComponentInfoMapProvider,
  useComponentInfoMap,
} from "./components/component-info-map";
import { DebugInfo } from "./components/debug-info";
import { Toolbar } from "./components/toolbar";

export default function App() {
  const [uncontrolledInitialOptions] =
    useState<GridStackOptions>(defaultGridOptions);

  const [initialComponentInfoMap] = useState<Record<string, ComponentInfo>>(
    () => ({
      item3: { component: "Text", serializableProps: { content: "Text" } },
      item4: {
        component: "Button",
        serializableProps: { label: "Click me" },
      },
      item999: {
        component: "ComplexCard",
        serializableProps: { title: "Complex Card" },
      },
    })
  );

  return (
    <GridStackProvider initialOptions={uncontrolledInitialOptions}>
      <ComponentInfoMapProvider
        initialComponentInfoMap={initialComponentInfoMap}
      >
        <Toolbar />

        <GridStackRender>
          {/* Simple: Render item with id selector */}
          <GridStackItem id="item1">
            <div>hello</div>
          </GridStackItem>

          <GridStackItem id="item2">
            <div>grid</div>
          </GridStackItem>

          {/* Advanced: Render item with widget map component info */}
          <DynamicComponents />

          {/* Experimental: Render item with custom handle */}
          <GridStackItem id="item5">
            <GridStackHandleReInitializer>
              <button className={CUSTOM_DRAGGABLE_HANDLE_CLASSNAME}>
                Handle ONLY HERE
              </button>
            </GridStackHandleReInitializer>
          </GridStackItem>
        </GridStackRender>

        <DebugInfo />
      </ComponentInfoMapProvider>
    </GridStackProvider>
  );
}

export function DynamicComponents() {
  const { componentInfoMap } = useComponentInfoMap();

  return (
    <>
      {Array.from(componentInfoMap.entries()).map(([id, componentInfo]) => {
        const Component = COMPONENT_MAP[componentInfo.component];
        if (!Component) {
          throw new Error(`Component ${componentInfo.component} not found`);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const props = componentInfo.serializableProps as any;

        if (componentInfo.component === "ComplexCard") {
          return (
            <GridStackItem key={id} id={id}>
              <ComplexCardEditableWrapper
                key={`complex-card-editable-wrapper-${id}`}
                serializableProps={componentInfo.serializableProps}
              >
                <Component {...props} key={`component-${id}`} />
              </ComplexCardEditableWrapper>
            </GridStackItem>
          );
        }

        return (
          <GridStackItem key={id} id={id}>
            <Component {...props} key={`component-${id}`} />
          </GridStackItem>
        );
      })}
    </>
  );
}
