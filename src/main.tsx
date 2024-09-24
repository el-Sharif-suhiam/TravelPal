import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppReducerContext } from "./contexts/AppReducerContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppReducerContext>
      <App />
    </AppReducerContext>
  </StrictMode>
);
