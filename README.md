# GridStack React

Online demo: https://gridstack-react.pages.dev/

## TODO

- [x] Add Widgets
- [x] Add Sub Grid
- [x] Nested Sub Grid
- [ ] Custom handle

## Usage

```tsx

const COMPONENT_MAP = {
  Text: (props: { content: string }) => <div>{props.content}</div>,
};

export default function App() {
  const [uncontrolledInitialOptions] =
    useState<GridStackOptions>(defaultGridOptions);

  const [widgetMapComponentInfo] = useState<
    Record<string, { component: keyof typeof COMPONENT_MAP; props: unknown }>
  >({
    item3: { component: "Text", props: { content: "Text 1" } },
    item4: { component: "Text", props: { content: "Text 2" } },
  });

  return (
    <GridStackProvider initialOptions={uncontrolledInitialOptions}>
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
        {Object.entries(widgetMapComponentInfo).map(([id, componentInfo]) => {
          const Component = COMPONENT_MAP[componentInfo.component];
          return (
            <GridStackItem key={id} id={id}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Component {...(componentInfo.props as any)} />
            </GridStackItem>
          );
        })}
      </GridStackRender>

      <DebugInfo />
    </GridStackProvider>
  );
}
```
