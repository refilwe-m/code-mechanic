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

function App() {
  const session = useSession(); //tokens
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext;

  if (isLoading) return <></>;

  const [bookingDate, setBookingDate] = useState(new Date());
  const sessionName = "Code Mechanics 💻🔧 | ";
  //const [eventName, setEventName] = useState(sessionName);
  //const [isVisible, setIsVisible] = useState(true);
  //const [signOutText, setSignOutText] = useState("Sign Out");
  //const [authText, setAuthText] = useState("Authorize");
  const [content, setContent] = useState("");

  const authorize = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { scopes: "https://www.googleapis.com/auth/calendar" },
    });
    if (error) {
      alert("Error occurred while  trying to log you in");
      console.error("Error:", error.message);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const createCalendarEvent = async (userName) => {
    console.log("Creating calendar event");
    const event = {
      summary: sessionName + userName,
      description:
        "Code Clinics Session to help developers with coding/technical blockers.",
      start: {
        dateTime: bookingDate.toISOString(), // Date.toISOString() ->
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
      },
      end: {
        dateTime: new Date(
          bookingDate.setTime(bookingDate.getTime() + 1 * 60 * 60 * 1000)
        ).toISOString(), // Date.toISOString() ->
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
      },
    };
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.provider_token, // Access token for google
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        toast.success(
          "Code Mechanics 💻🔧 with Refilwe Mashile created, check your Google Calendar!",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      });
  };

  return (
    <div className="App">
      <h1>Code Mechanics💻🔧</h1>
      {session && (
        <div className="greeting">
          <h3>Hey, {session.user.email}</h3>
          <p>Let's help you book a session, for your coding problems!😉</p>
        </div>
      )}

      {session ? (
        <section>
          <h3>Book your slot</h3>
          <DateTimePicker
            className="date-picker"
            calendarIcon={<img className="icon-calendar" src={CalendarIcon} />}
            onChange={setBookingDate}
            value={bookingDate}
            timeFormat={"24hr"}
          />
          <button
            id="create_event_button"
            onClick={() => {
              setContent(sessionName + session.user.user_metadata.name);
              createCalendarEvent(session.user.user_metadata.name);
            }}
          >
            Book Session
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </section>
      ) : (
        <button id="authorize_button" onClick={authorize}>
          Authorize
        </button>
      )}

      {session && (
        <button id="signout_button" onClick={signOut}>
          Sign Out
        </button>
      )}
      <pre id="content" style={{ whiteSpace: "pre-wrap" }}>
        {content}
      </pre>
    </div>
  );
}

export default App;
