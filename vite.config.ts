import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/styles"),

      "@componentsV01": path.resolve(__dirname, "src/v01/components"),
      "@dataV01": path.resolve(__dirname, "src/v01/data"),
      "@hooksV01": path.resolve(__dirname, "src/v01/hooks"),
      "@interfacesV01": path.resolve(__dirname, "src/v01/interfaces"),
      "@pagesV01": path.resolve(__dirname, "src/v01/pages"),

      "@apisV02": path.resolve(__dirname, "src/v02/apis"),
      "@routersV02": path.resolve(__dirname, "src/v02/routers"),
      "@componentsV02": path.resolve(__dirname, "src/v02/components"),
      "@dataV02": path.resolve(__dirname, "src/v02/data"),
      "@hooksV02": path.resolve(__dirname, "src/v02/hooks"),
      "@interfacesV02": path.resolve(__dirname, "src/v02/interfaces"),
      "@pagesV02": path.resolve(__dirname, "src/v02/pages"),
      "@utilsV02": path.resolve(__dirname, "src/v02/utils"),
    },
  },
});
