import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import { defineConfig } from "vite";
import { themePlugin } from "./src/theme/vite-plugin";

export default defineConfig({
  plugins: [tailwindcss(), themePlugin(), reactRouter(), imagetools()],
});
