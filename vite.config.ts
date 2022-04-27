import { defineConfig, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import babel from "@rollup/plugin-babel";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const returnObj: UserConfigExport = {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        lib: resolve(__dirname, "lib"),
        packages: "lib/packages",
        hooks: "lib/hooks"
      },
      extensions: [
        ".mjs",
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
        ".json",
        ".png",
        "jpeg",
        ".vue"
      ]
    },
    build: {
      lib: {
        entry: "./lib/index.ts",
        name: "monkey-ui",
        formats: ["es"]
      },
      outDir: "site",
      rollupOptions: {
        output: {
          manualChunks: {
            axios: ["axios"]
          }
        },
        plugins: [
          babel({
            babelHelpers: "bundled"
          })
        ]
      }
    },
    server: {
      port: 8080
    }
  };
  if (command === "serve") {
  } else {
  }
  return returnObj;
});
