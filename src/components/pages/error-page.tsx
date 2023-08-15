import React from "react";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-error404 bg-cover w-screen h-screen flex justify-center">
      <button
        className="absolute bottom-1/4 border border-red-600 p-2 rounded-xl hover:bg-red-400"
        onClick={() => navigate("/login")}
      >
        Home Page
      </button>
    </main>
  );
};
