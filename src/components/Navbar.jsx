import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Calculator",
      path: "/calculator",
    },
    {
      name: "History",
      path: "/history",
    },
    {
      name: "Usage",
      path: "/usage",
    },
    {
      name: "Settings",
      path: "/settings",
    },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-xl">
              💧
            </div>

            <div>
              <h1 className="font-bold text-slate-800">
                Water Meter
              </h1>

              <p className="text-xs text-slate-400">
                Calculator
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="md:hidden">
            <details className="relative">
              <summary className="list-none cursor-pointer w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-xl">
                ☰
              </summary>

              <div className="absolute right-0 mt-2 w-52 bg-white shadow-xl rounded-xl p-2 border">
                {links.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-sm ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-slate-700 hover:bg-blue-50"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}