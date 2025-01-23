# GridStack React

Online demo: https://gridstack-react.pages.dev/

> The code in this repository will be manually copied to the react folder of the [gridstack.js](https://github.com/gridstack/gridstack.js) main repository.

## TODO

- [x] Add Widgets
- [x] Add Sub Grid
- [x] Nested Sub Grid
- [x] Remove Widget
- [x] Copy(Duplicate) Widget
- [x] Custom handle
- [ ] Drag between two grid stacks

Welcome to give any suggestions and ideas, you can submit an issue or contact me by email. :)

## Usage

**Simple**

Render item with widget id selector.

```tsx
function App() {
  const [uncontrolledInitialOptions] = useState<GridStackOptions>({
    // ...
    children: [
      { id: "item1", h: 2, w: 2, x: 0, y: 0 },
      { id: "item2", h: 2, w: 2, x: 2, y: 0 },
    ],
  });

  return (
    <GridStackProvider initialOptions={uncontrolledInitialOptions}>
      <Toolbar />

      <GridStackRender>
        <GridStackItem id="item1">
          <div>hello</div>
        </GridStackItem>

        <GridStackItem id="item2">
          <div>grid</div>
        </GridStackItem>
      </GridStackRender>
    </GridStackProvider>
  );
}
```

**Advanced**

Render item with widget map component info.

_ComponentInfoMap is just an example, you can use any way you want to store and retrieve component information._

```tsx
function App() {
  const [uncontrolledInitialOptions] = useState<GridStackOptions>({
    // ...
    children: [
      { id: "item1", h: 2, w: 2, x: 0, y: 0 },
      { id: "item2", h: 2, w: 2, x: 2, y: 0 },
    ],
  });

  const [initialComponentInfoMap] = useState<Record<string, ComponentInfo>>(
    () => ({
      item1: { component: "Text", serializableProps: { content: "Text" } },
      item2: {
        component: "ComplexCard",
        serializableProps: { title: "Complex Card", color: "red" },
      },
    })
  );

  return (
    <ComponentInfoMapProvider initialComponentInfoMap={initialComponentInfoMap}>
      <GridStackProvider initialOptions={uncontrolledInitialOptions}>
        <Toolbar />

        <GridStackRender>
          <DynamicGridStackItems />
        </GridStackRender>
      </GridStackProvider>
    </ComponentInfoMapProvider>
  );
}

export function DynamicGridStackItems() {
  const { componentInfoMap } = useComponentInfoMap();

  return (
    <>
      {Array.from(componentInfoMap.entries()).map(
        ([widgetId, componentInfo]) => {
          const Component = COMPONENT_MAP[componentInfo.component];
          if (!Component) {
            throw new Error(`Component ${componentInfo.component} not found`);
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const props = componentInfo.serializableProps as any;

          if (componentInfo.component === "ComplexCard") {
            return (
              <GridStackItem key={widgetId} id={widgetId}>
                <ComplexCardEditableWrapper
                  key={`complex-card-editable-wrapper-${widgetId}`}
                  serializableProps={componentInfo.serializableProps}
                >
                  <Component {...props} key={`component-${widgetId}`} />
                </ComplexCardEditableWrapper>
              </GridStackItem>
            );
          }

          return (
            <GridStackItem key={widgetId} id={widgetId}>
              <Component {...props} key={`component-${widgetId}`} />
            </GridStackItem>
          );
        }
      )}
    </>
  );
}
```

**Experimental**

Render item with custom handle.

```tsx
<GridStackItem id="xxx">
  <GridStackHandleReInitializer>
    <button className={CUSTOM_DRAGGABLE_HANDLE_CLASSNAME}>
      Handle ONLY HERE
    </button>
  </GridStackHandleReInitializer>
</GridStackItem>
```
