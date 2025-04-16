// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:8080",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//     port: 3000,
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Use relative paths for assets
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
    port: 3000,
  },
});
