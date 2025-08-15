"use client";

import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";
import { useAuth } from "../../../hooks/useAuth";
import type { User } from "../../../types/auth";
import "./AdminLayout.css";

export function AdminLayout() {
  const { user } = useAuth();

  return (
    <div className="admin-layout">
      <Sidebar />
      {user && <Header user={user as User} />}
      <main className="admin-layout__main">
        <div className="admin-layout__content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
