import reactRefresh from "@vitejs/plugin-react";
import { createApp } from "vinxi";

export default createApp({
  routers: [
    {
      name: "client",
      type: "spa",
      handler: "./index.html",
      target: "browser",
      plugins: () => [reactRefresh()],
    },
    {
      name: "api",
      type: "http",
      base: "/api",
      handler: "./api/data.ts",
    },
  ],
});