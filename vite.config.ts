// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tsconfigPaths from 'vite-tsconfig-paths'


// export default defineConfig({
// plugins: [react(), tsconfigPaths()],
// })

// export default defineConfig({
// plugins: [react(), tsconfigPaths()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://image-gallery-19jyff1ws-muthulakshmys-projects.vercel.app",
//         changeOrigin: true,
//       },
//     },
//   },
// });


import { defineConfig } from "vite";
const react = require("@vitejs/plugin-react");
const tsconfigPaths = require("vite-tsconfig-paths");

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      "/api": {
        target: "https://image-gallery-19jyff1ws-muthulakshmys-projects.vercel.app",
        changeOrigin: true,
      },
    },
  },
});

