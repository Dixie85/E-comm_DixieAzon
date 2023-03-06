import CategorySorter from "./CategorySorter.jsx";
import { useEffect, useState } from "react";
import useProduct from "../../hooks/useProduct.jsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import ProductPagination from "../productPagination.jsx";

const PRODUCKTS_URL = "/api/product";

function ProductList() {
  const { products ,setProducts } = useProduct();
  const [filterCategory, setFilterCategory] = useState('all')
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProducts = async () => {
      try {
        const response = await axiosPrivate.get(PRODUCKTS_URL, {
          signal: controller.signal,
        });
        console.log(response, "responce");
        setProducts(() => [...response?.data.data]);
      } catch (error) {
        console.log(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories =
  products
    .map(product => product.category)
    .reduce((arr, currentCategory) => {
      if (arr.includes(currentCategory)) {
        return [...arr]
      } else {
        return [...arr, currentCategory]
      }
    }, ['all']
  );

  function sorterFunction(category) {
    setFilterCategory(category);
  }

  return (
    <section className="flex flex-col max-w-screen-xl mx-auto">
      <CategorySorter
        categories={categories}
        sorterFunction={sorterFunction}
      />
      <section className={"product_list"}>
        <ProductPagination products={products
        .filter(product =>
          filterCategory === 'all' ? true : product.category === filterCategory
        )}/>
      </section>
    </section>
  );
}

export default ProductList;
