import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite konfigürasyonu
export default defineConfig(() => {
  return {
    server: {
      host: true,
    },
    plugins: [react()],
  };
});
