import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

const Dashboard = () => {
  const { user } = useContext(AuthContext)
  
  return ( 
    <h1>Dashboard: {user?.email}</h1>
  );
}
 
export default Dashboard;