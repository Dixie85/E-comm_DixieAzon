import { useContext } from "react";
import ProductContext from "../context/ProductProvider";

const useProduct = () => useContext(ProductContext);

export default useProduct;