import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { nodeExternals } from 'rollup-plugin-node-externals'

import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [nodeExternals(),dts({ rollupTypes: true })],
  build: {
    lib: { entry: resolve(__dirname, "lib/index.ts"), formats: ["es"] },
  }
});
