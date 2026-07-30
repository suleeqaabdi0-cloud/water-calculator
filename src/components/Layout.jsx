import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer className="border-t bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-slate-500">
            💧 Water Meter Calculator
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Manage your water consumption easily
          </p>
        </div>
      </footer>
    </div>
  );
}