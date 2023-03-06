import { useContext } from "react";
import StoreContext from "../context/StoreProvider";
import SuperStoresContext from "../context/SuperStoresProvider";

export const useStores = () => useContext(SuperStoresContext);

const useStore = () => useContext(StoreContext);

export default useStore;