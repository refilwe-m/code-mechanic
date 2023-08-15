import { createClient } from "@supabase/supabase-js";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthPage, ErrorPage, BookingPage, Root } from "./components";

const supabase = createClient(
  import.meta.env.VITE_PROJECT_URL,
  import.meta.env.VITE_API_KEY
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/booking",
        element: <BookingPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <RouterProvider router={router} />
      {/*      <App /> */}
    </SessionContextProvider>
  </React.StrictMode>
);
