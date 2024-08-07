import React from "react";
import SignOut from "../component/dashboard/SignOut";
import Sidebar from "../component/dashboard/Sidebar";
import { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Dashboard | Telkom InnoCent",
  description: "Dashboard Telkom Innovation Center",
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-screen flex relative">
      <Sidebar />
      <div className="md:w-[75%] lg:w-[80%] xl:w-[85%]">
        <header className="px-10 py-6 text-xl flex justify-between items-center">
          <strong>Dashboard</strong>
          <SignOut />
        </header>
        <div className="px-10 py-6 min-w-full min-h-screen">{children}</div>
        <footer className="px-10 py-6 border-t text-sm text-slate-500">
          <p>© 2024 Seville. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
