import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";


const sidebarItems = [
  { label: "Dashboard", key: "dashboard" },
  { label: "Doctor Verification", key: "doctor-verification" },
  { label: "Doctors", key: "doctors" },
  { label: "Departments", key: "departments" },
  { label: "Patients", key: "patients" },
  { label: "Doctor Payment", key: "doctor-payment" },
  { label: "Crowdfunding Verification", key: "crowdfunding-verification" },
  { label: "Logout", key: "logout" },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname.split("/")[2] || "dashboard";

  const handleSidebarClick = (key: string) => {
    if (key === "logout") {
      localStorage.removeItem("adminToken");
      toast.success("Logged out successfully!"); 
      navigate("/admin/login");
    } else {
      navigate(`/admin/${key}`);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-blue-300 to-blue-600">
      {/* Sidebar */}
      <aside className="w-64 bg-white/90 border-r border-blue-200 shadow-2xl flex flex-col py-8 px-4">
        <h2 className="text-2xl font-bold text-blue-700 mb-10 text-center tracking-wide">Admin Panel</h2>
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarItems.map(item => (
              <li key={item.key}>
                <button
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition ${
                    active === item.key
                      ? "bg-blue-600 text-white shadow"
                      : "text-blue-700 hover:bg-blue-100"
                  }`}
                  onClick={() => handleSidebarClick(item.key)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex justify-end items-center h-16 px-8 bg-white/80 border-b border-blue-200 shadow">
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              navigate("/admin/login");
            }}
            className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow transition"
          >
            Logout
          </button>
        </header>
        {/* Dashboard Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
       <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AdminLayout;