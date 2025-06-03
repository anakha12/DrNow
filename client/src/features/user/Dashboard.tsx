import { useEffect, useState } from "react";
import { getProtectedData } from "../../services/userService";

const Dashboard = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const data = await getProtectedData();
        setMessage(data.message);
      } catch (err: any) {
        setMessage("Access denied or login expired.");
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;
