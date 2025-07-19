import axios from "axios";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./App.css";
import App from "./App.tsx";
import "./Global.css";
import { setupAxios } from "./lib/api/ApiClient.ts";

const loadConfig = async () => {
  const response = await fetch("/runtime-config.json");
  const config = await response.json();
  window.runtimeConfig = config;
};

loadConfig().then(() => {
  setupAxios(axios);

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ToastContainer autoClose={false} />
      <App />
    </StrictMode>
  );
});
