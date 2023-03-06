import { fakeProducts } from "../fakedata/fakedata.js";
import AdminProductList from "./products/AdminProductList.jsx";
import { useEffect, useState } from "react";
import useStore from "../hooks/useStore.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";

const STORE_URL = "/api/store/";
const STORE_PRODUCTS_URL = "/api/store/products/";

function AdminPage() {
  const { auth } = useAuth();
  const { store, setStore } = useStore();
  const [nameInput, setNameInput] = useState('');
  const [dBUpdated, setDBUpdated] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  console.log(store, "store");

  //Creating the first store function 
  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
          const response = await axiosPrivate.post(
          STORE_URL,
          JSON.stringify({name:nameInput, email:auth.email}),

          );
          console.log(JSON.stringify(response?.data), 'response form newStore');
          navigate('/login', { replace: true });
      //     setNameInput('');
    } catch (error) {
      console.log(error);
    }
  };

  //Getting and storing a single store data in the context
  useEffect(() => {
    const getStore = async () => {
      try {
        const responseSTORE = await axiosPrivate.get(STORE_URL + auth?.storeId);
        console.log(responseSTORE, "responseSTORE");

        const responsePRODUCTS = await axiosPrivate.get(STORE_PRODUCTS_URL + auth?.storeId);
        console.log(responsePRODUCTS, "responsePRODUCTS");

        const name = responseSTORE?.data.data.name
        const products = responsePRODUCTS?.data.data
        setStore(() => {return { name, products}});
      } catch (error) {
        console.log(error);
      }
    }
    getStore()
  },[dBUpdated])

  //If store data not found(new Admin user), display create new stor form.
  return (
    <>
      {!auth.storeId && (
        <section className="text-center">
          <h2 className="my-5 text-2xl">{`Welcome ${auth.email} to your new ADMIN PAGE`}</h2>
          <p className="my-2">
            Congratulation!!! You successfully created you new admin profile on
            DixeAzone
          </p>
          <p className="my-2">let's go now and create your store</p>
          <form onSubmit={onFormSubmit} className="flex flex-col">
          <label htmlFor="name" className="my-2">Enter store name:</label>
        <input
          placeholder="Store name"
          id="name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="mx-auto text-center rounded-md"
        />
        <button className="my-2 py-1 px-5 rounded-lg bg-white mx-auto hover:bg-teal-200/70 hover:shadow-md active:bg-teal-500 active:text-white focus:outline-none">Create</button>
          </form>
          <p className="my-2">NOTE! After submitting the name, you will be redirected to the log in page. Log in again to to start your new store </p>
        </section>
      )}
      {auth.storeId && (
        <section>
          <header className="m-4 text-xl text-center">Welcome to the "{store.name}" store</header>
          <AdminProductList products={store.products} storeName={store.name} setDBUpdated={setDBUpdated}/>
        </section>
      )}
    </>
  );
}

export default AdminPage;
