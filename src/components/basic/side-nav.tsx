import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarDaysIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export const SideNav: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white h-full w-56 flex-shrink-0 p-4">
      <h1 className="text-teal-400 py-6 text-4xl font-extrabold">LOGO</h1>{" "}
      {/* <img src={Logo} alt="logo" /> */}
      <ul>
        <li className="mb-2">
          <Link
            to="/booking"
            className="flex items-center gap-2 hover:text-teal-600"
          >
            <CalendarDaysIcon className="w-4" />
            Book a session
          </Link>
        </li>
      </ul>
      <Link
        to="/login"
        className="flex items-center absolute bottom-0 mb-6 hover:text-teal-600"
      >
        <ArrowRightOnRectangleIcon className="mr-2" />
        Logout
      </Link>
    </div>
  );
};
