import StoreOverview from "./StoreOverview.jsx";
import { Outlet } from "react-router-dom";
import { useStores } from "../hooks/useStore.jsx";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.jsx";
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";

const STORE_URL = "/api/store/";

function SuperAdminPage() {
  const { auth } = useAuth();
  const {stores, setStores} = useStores();
  const [storesDBUpdated, setStoresDBUpdated] = useState(false);
  const axiosPrivate = useAxiosPrivate();


  //Getting and set ALL stores context
  useEffect(() => {
    const getStores = async () => {
      try {
        const responseSTORES = await axiosPrivate.get(STORE_URL);
        console.log(responseSTORES.data.data, "responseSTOREs");
        setStores(() => responseSTORES.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getStores()
  },[storesDBUpdated]);

  
  return (
    <section className="flex">
      <div >
        {stores?.map((s) => {
          return <StoreOverview key={s.uniqueStoreId} storeInfo={s} setStoresDBUpdated={setStoresDBUpdated}/>;
        })}
      </div>
      <div className="flex-1 border-l pl-2">
        <header className="text-center my-2 text-lg">Welcome Almighty SuperAdmin {auth.email}</header>
        <Outlet />
      </div>
    </section>
  );
}

export default SuperAdminPage;
