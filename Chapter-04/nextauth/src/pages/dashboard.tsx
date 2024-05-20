import Can from "@/components/Can";
import { AuthContext, signOut } from "@/contexts/AuthContext";
import { useCan } from "@/hooks/useCan";
import { setupAPIClient } from "@/services/api";
import { api } from "@/services/apiClient";
import { withSSRAuth } from "@/utils/withSSRAuth";
import { useContext, useEffect } from "react";

const Dashboard = () => {
  const { user, signOut } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }, [])
  
  return ( 
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Sign out</button>

      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </>
  );
}
 
export default Dashboard;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')

  return {
    props: {}
  }
})