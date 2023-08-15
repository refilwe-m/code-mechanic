import React, { FC } from "react";
import { SideNav } from "../basic/side-nav";
import { ChildrenProps } from "../../types";
import { Outlet } from "react-router-dom";

export const Root: FC<ChildrenProps> = ({ children }) => {
  return (
    <main className="flex justify-between">
      <section className="h-screen">
        <SideNav />
      </section>
      {children || <Outlet />}
    </main>
  );
};
