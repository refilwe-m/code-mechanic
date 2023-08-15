import React, { useState } from "react";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import DateTimePicker from "react-datetime-picker/dist/DateTimePicker";
import { ToastContainer } from "react-toastify";
import { CalendarIcon } from "../../assets";
import SearchBox from "../basic/search-box";

export const BookingPage = () => {
  const [content, setContent] = useState("");
  const [bookingDate, setBookingDate] = useState(new Date());
  const sessionName = "Code Mechanics 💻🔧 | ";
  const session = useSession(); //tokens
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext;

  const signOut = async () => {
    setContent("");
    await supabase.auth.signOut();
  };

  return (
    <main className="booking">
      <SearchBox />
      {session && (
        <div className="greeting">
          <h3>Hey, {session.user.email}</h3>
          <p>Let's help you book a session, for your coding problems!😉</p>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {!session && (
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
              setContent(sessionName + session?.user.user_metadata.name);
              createCalendarEvent(session?.user.user_metadata.name);
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
      )}

      {session && (
        <button id="signout_button" onClick={signOut}>
          Sign Out
        </button>
      )}
      <pre id="content" style={{ whiteSpace: "pre-wrap" }}>
        {content}
      </pre>
    </main>
  );
};
