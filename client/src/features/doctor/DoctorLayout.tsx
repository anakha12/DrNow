import { Outlet, useNavigate, useLocation } from "react-router-dom";

const sidebarItems = [
  { label: "Dashboard", key: "dashboard" },
  { label: "Appointments", key: "appointments" },
  { label: "Current Schedules", key: "current-schedules" },
  { label: "Chat", key: "chat" },
  { label: "Wallet", key: "wallet" },
  { label: "Profile", key: "profile" },
  { label: "Logout", key: "logout" },
];

const DoctorLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const active = location.pathname.split("/")[2] || "dashboard";

  const handleSidebarClick = (key: string) => {
    if (key === "logout") {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      navigate(`/doctor/${key}`);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-100 via-green-300 to-green-600">
      {/* Sidebar */}
      <aside className="w-64 bg-white/90 border-r border-green-300 shadow-lg flex flex-col py-8 px-6">
        <h2 className="text-2xl font-bold text-green-700 mb-10 text-center tracking-wide">
          Doctor Panel
        </h2>
        <nav className="flex-1">
          <ul className="space-y-3">
            {sidebarItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => handleSidebarClick(item.key)}
                  className={`w-full text-left px-5 py-3 rounded-lg font-semibold transition
                    ${
                      active === item.key
                        ? "bg-green-600 text-white shadow-md"
                        : "text-green-700 hover:bg-green-200"
                    }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex justify-end items-center h-16 px-8 bg-white/90 border-b border-green-300 shadow-sm">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/doctor/login");
            }}
            className="py-2 px-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow transition"
          >
            Logout
          </button>
        </header>

        {/* Outlet for nested routes */}
        <main className="flex-1 p-8 overflow-auto bg-white/80 rounded-tr-xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
