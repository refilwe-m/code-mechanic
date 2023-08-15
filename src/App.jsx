import { useState, useEffect } from "react";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DateTimePicker from "react-datetime-picker";
import CalendarIcon from "./assets/calendar.svg";
import "./App.css";
import { AuthPage } from "./components";

function App() {
  return <AuthPage />;
}

export default App;
