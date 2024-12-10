# GridStack React

Online demo: https://gridstack-react.pages.dev/

## TODO

- [x] Component Map
- [x] Add Widgets
- [x] Add Sub Grid
- [x] Nested Sub Grid

## Usage

```tsx
const COMPONENT_MAP: Record<string, React.FC<{ content: string }>> = {
  Text: ({ content }) => <div className="w-full h-full">{content}</div>,
  // ... other components here
};

const gridOptions: GridStackOptions = {
  // ... initial grid options here
  children: [
    {
      w: 2,
      h: 2,
      x: 0,
      y: 0,
      content: JSON.stringify({
        component: "Text",
        props: { content: "Item 1" },
      }),
    },
  ],
};

export default function App() {
  const [initialOptions] = useState(gridOptions);

  return (
    <GridStackProvider initialOptions={initialOptions}>
      <!-- Custom Toolbar maybe -->
      <Toolbar />

      <GridStackRenderProvider>
        <GridStackRender componentMap={COMPONENT_MAP} />
      </GridStackRenderProvider>

      <!-- other content... -->
    </GridStackProvider>
  );
}
```
