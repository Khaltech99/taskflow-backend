import { defineConfig } from "vitest";

export default defineConfig({
  test: {
    global: true,
    environment: "node",
  },
});
