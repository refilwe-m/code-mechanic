import { createClient } from "@supabase/supabase-js";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import "./index.css";

const supabase = createClient(
  import.meta.env.VITE_PROJECT_URL,
  import.meta.env.VITE_API_KEY
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
