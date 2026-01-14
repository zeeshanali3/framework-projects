import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import os from "os";
import path from "path";

// Performance monitoring plugin
const performanceMonitorPlugin = () => {
  let startTime;
  let startMemory;

  return {
    name: "performance-monitor",
    buildStart() {
      startTime = Date.now();
      startMemory = process.memoryUsage();
      console.log("\n🚀 Build started...");
      console.log(
        `📊 Initial RAM usage: ${(startMemory.heapUsed / 1024 / 1024).toFixed(
          2
        )} MB`
      );
      console.log(`💻 CPU cores available: ${os.cpus().length}`);
      console.log(`🔧 Node.js version: ${process.version}`);
      console.log(`⚡ Platform: ${os.platform()} ${os.arch()}`);
    },

    buildEnd() {
      const endTime = Date.now();
      const endMemory = process.memoryUsage();
      const buildTime = (endTime - startTime) / 1000;
      const memoryUsed =
        (endMemory.heapUsed - startMemory.heapUsed) / 1024 / 1024;
      const peakMemory = endMemory.heapUsed / 1024 / 1024;

      console.log("\n✅ Build completed!");
      console.log(`⏱️  Total build time: ${buildTime.toFixed(2)} seconds`);
      console.log(
        `📈 Memory used during build: ${
          memoryUsed > 0 ? "+" : ""
        }${memoryUsed.toFixed(2)} MB`
      );
      console.log(`🎯 Peak memory usage: ${peakMemory.toFixed(2)} MB`);
      console.log(
        `📊 Final RAM usage: ${(endMemory.heapUsed / 1024 / 1024).toFixed(
          2
        )} MB`
      );
      console.log(
        `💾 External memory: ${(endMemory.external / 1024 / 1024).toFixed(
          2
        )} MB`
      );
      console.log(`🏆 Build performance summary:`);
      console.log(
        `   - Speed: ${
          buildTime < 30
            ? "🟢 Fast"
            : buildTime < 60
            ? "🟡 Moderate"
            : "🔴 Slow"
        }`
      );
      console.log(
        `   - Memory: ${
          peakMemory < 500
            ? "🟢 Efficient"
            : peakMemory < 1000
            ? "🟡 Moderate"
            : "🔴 High"
        }`
      );
    },

    generateBundle() {
      const currentMemory = process.memoryUsage();
      console.log(
        `📦 Bundle generation - RAM: ${(
          currentMemory.heapUsed /
          1024 /
          1024
        ).toFixed(2)} MB`
      );
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    performanceMonitorPlugin(),
    react({
      include: "**/*.{jsx,tsx,js,ts}",
      jsxRuntime: "automatic",
    }),
  ],
  server: {
    port: 3000,
    open: true,
    host: true,
    hmr: {
      overlay: false,
    },
    fs: {
      // ✅ Allow Vite to access and watch files outside project root if needed
      allow: [
        path.resolve(__dirname), // project root
        "src", // default project source
        "node_modules",
        path.resolve(__dirname, "node_modules/UBS_List_Package"), // if package is sibling folder
      ],
    },

    watch: {
      // ✅ Force Vite to watch Common files and rebuild package imports when changed
      ignored: [
        "!/node_modules/UBS_List_Package/",
      ],
    },
  },
  build: {
    outDir: "build",
    sourcemap: false, // Disable source maps for production to save memory
    minify: "terser",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "mui-vendor": [
            "@mui/material",
            "@mui/icons-material",
            "@mui/x-data-grid",
          ],
          "redux-vendor": ["redux", "react-redux", "redux-saga"],
          "utils-vendor": ["axios"],
        },
      },
      // Reduce memory usage during build
      maxParallelFileOps: 2,
    },
    // Optimize build performance
    target: "esnext",
    cssCodeSplit: true,
  },
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    dedupe: ["react", "react-dom", "react-router-dom"],
  },
  esbuild: {
    loader: "jsx",
    include: /\.[jt]sx?$/,
    exclude: [],
    drop: ["console", "debugger"], // Remove console and debugger statements in production
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".ts": "tsx",
        ".jsx": "jsx",
        ".tsx": "tsx",
      },
      // Limit memory usage during optimization
      target: "esnext",
    },
    // Force optimization of large dependencies
    force: true,
  },
});