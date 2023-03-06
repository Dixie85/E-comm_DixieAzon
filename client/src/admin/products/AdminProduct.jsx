import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UPDATE_QUANTITY_URL = "/api/product/quantity";
const DELETE_PRODUCT_URL = "/api/product/";

function AdminProduct({ product, setDBUpdated }) {
  const [errMsg, setErrMsg] = useState("");
  const [quantity, setQuantity] = useState("");
  const [moreText, setMoreText] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const onQuantityUpdate = async () => {
    try {
      const response = await axiosPrivate.patch(
        UPDATE_QUANTITY_URL,
        JSON.stringify({ quantity, id: product.id })
      );
      console.log(
        JSON.stringify(response?.data),
        "response form updateQuantity"
      );
      setQuantity("");
      setDBUpdated((prev) => !prev);
    } catch (error) {
      setErrMsg(error?.response?.data?.message);
    }
  };

  const onProductDelete = async () => {
    try {
      const response = await axiosPrivate.delete(
        DELETE_PRODUCT_URL + product.id
      );
      setDBUpdated((prev) => !prev);
    } catch (error) {
      setErrMsg(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [quantity]);

  return (
    <article className="flex flex-col my-2 p-3 bg-white rounded-lg w-full xl:max-w-xl xl:mr-1 shadow">
      <div className="mb-2">
        <h1 className="text-lg font-bold">{product.title}</h1>
        <h2>{!moreText ? product.description.slice(0, 150) : product.description}<span onClick={() => setMoreText(prev => !prev)} className="text-red-500">{!moreText ? '...show more' : '...show less'}</span></h2>
      </div>
      <div className="flex flex-wrap justify-between items-center">
        <img
          src={product.imageUrl}
          alt={"picture of product"}
          className="max-w-[150px] "
        />
        <label className="flex flex-col my-2">
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            value={quantity}
            placeholder={`Current quantity ${product.quantity}`}
            className="border rounded-md p-1 text-center focus:outline-none"
          />
          <button disabled={!quantity} onClick={onQuantityUpdate} className="mt-2 py-1 px-2 border rounded-lg cursor-pointer">
            Update quantity
          </button>
        </label>
        <div>
          <button onClick={onProductDelete} className="py-2 px-3 border rounded-lg ">Delete product</button>
          {errMsg && <p>{errMsg}</p>}
        </div>
      </div>
    </article>
  );
}

export default AdminProduct;
