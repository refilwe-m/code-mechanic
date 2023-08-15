import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";

export const AuthPage = () => {
  const supabase = useSupabaseClient();

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

  return (
    <main>
      <h1>
        <span>Welcome to</span>, Code Mechanics💻🔧
      </h1>
      <button id="authorize_button" onClick={authorize}>
        Authorize
      </button>
    </main>
  );
};
