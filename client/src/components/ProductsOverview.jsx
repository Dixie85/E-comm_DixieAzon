import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminProduct from '../admin/products/AdminProduct';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const STORE_PRODUCTS_URL = "/api/store/products/";

const ProductsOverview = () => {
  const {id} = useParams();
  const [products, setProducts] = useState();
  const [dBUpdated, setDBUpdated] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  //Getting and set ALL stores context
  useEffect(() => {
    const getStoreProducts = async () => {
      try {
        const response = await axiosPrivate.get(STORE_PRODUCTS_URL + id);
        console.log(response, "response");
        setProducts(() => response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getStoreProducts()
  },[id, dBUpdated]);

  return (
    <>
    <section className='flex flex-wrap'>
      {products?.map((p) => {
        return <AdminProduct key={p.id} product={p} setDBUpdated={setDBUpdated}/>;
      })}
    </section>
    </>
  )
}

export default ProductsOverview