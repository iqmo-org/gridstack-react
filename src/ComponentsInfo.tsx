import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { ComponentInfo } from "./componentMap";

export const ComponentInfoMapContext = createContext<{
  componentInfoMap: Map<string, ComponentInfo>;
  setComponentInfoMap: (componentInfoMap: Map<string, ComponentInfo>) => void;
  removeComponentInfo: (widgetId: string) => void;
  addComponentInfo: (widgetId: string, componentInfo: ComponentInfo) => void;
  updateComponentInfo: (widgetId: string, componentInfo: ComponentInfo) => void;
}>({
  componentInfoMap: new Map(),
  setComponentInfoMap: () => {},
  removeComponentInfo: () => {},
  addComponentInfo: () => {},
  updateComponentInfo: () => {},
});

export function ComponentInfoMapProvider({
  children,
  initialComponentInfoMap,
}: PropsWithChildren<{
  initialComponentInfoMap: Record<string, ComponentInfo>;
}>) {
  const [componentInfoMap, setComponentInfoMap] = useState<
    Map<string, ComponentInfo>
  >(new Map(Object.entries(initialComponentInfoMap)));

  const removeComponentInfo = useCallback((widgetId: string) => {
    setComponentInfoMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(widgetId);
      return newMap;
    });
  }, []);

  const addComponentInfo = useCallback(
    (widgetId: string, componentInfo: ComponentInfo) => {
      setComponentInfoMap((prev) => {
        const newMap = new Map(prev);
        newMap.set(widgetId, componentInfo);
        return newMap;
      });
    },
    []
  );

  const updateComponentInfo = useCallback(
    (widgetId: string, componentInfo: ComponentInfo) => {
      setComponentInfoMap((prev) => {
        const newMap = new Map(prev);
        newMap.set(widgetId, componentInfo);
        return newMap;
      });
    },
    []
  );

  return (
    <ComponentInfoMapContext.Provider
      value={{
        componentInfoMap,
        setComponentInfoMap,
        removeComponentInfo,
        addComponentInfo,
        updateComponentInfo,
      }}
    >
      {children}
    </ComponentInfoMapContext.Provider>
  );
}

export function useComponentInfoMap() {
  const context = useContext(ComponentInfoMapContext);
  if (!context) {
    throw new Error(
      "useComponentInfoMap must be used within a ComponentInfoMapProvider"
    );
  }
  return context;
}
