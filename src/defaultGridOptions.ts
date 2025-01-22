import { GridStackOptions } from "gridstack";

export const CELL_HEIGHT = 50;
export const BREAKPOINTS = [
  { c: 1, w: 700 },
  { c: 3, w: 850 },
  { c: 6, w: 950 },
  { c: 8, w: 1100 },
];

export const defaultGridOptions: GridStackOptions = {
  acceptWidgets: true,
  columnOpts: {
    breakpointForWindow: true,
    breakpoints: BREAKPOINTS,
    layout: "moveScale",
    columnMax: 12,
  },
  margin: 8,
  cellHeight: CELL_HEIGHT,
  subGridOpts: {
    acceptWidgets: true,
    columnOpts: {
      breakpoints: BREAKPOINTS,
      layout: "moveScale",
    },
    margin: 8,
    minRow: 2,
    cellHeight: CELL_HEIGHT,
  },
  children: [
    {
      id: "item1",
      h: 2,
      w: 2,
      x: 0,
      y: 0,
    },
    {
      id: "item2",
      h: 2,
      w: 2,
      x: 2,
      y: 0,
    },
    {
      id: "sub-grid-1",
      h: 5,
      sizeToContent: true,
      subGridOpts: {
        acceptWidgets: true,
        cellHeight: CELL_HEIGHT,
        alwaysShowResizeHandle: false,
        column: "auto",
        minRow: 2,
        layout: "list",
        margin: 8,
        children: [
          {
            id: "sub-grid-1-title",
            locked: true,
            noMove: true,
            noResize: true,
            w: 12,
            x: 0,
            y: 0,
          },
          {
            id: "item3",
            h: 2,
            w: 2,
            x: 0,
            y: 1,
          },
          {
            id: "item4",
            h: 2,
            w: 2,
            x: 2,
            y: 0,
          },
        ],
      },
      w: 12,
      x: 0,
      y: 2,
    },
  ],
};
