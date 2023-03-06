import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const NEW_PRODUCT_URL = "/api/product";

function AddProductForm({setDBUpdated}) {
  const { auth } = useAuth();
  const INITIAL_STATE = {storeId:auth.storeId, title: '', quantity: 0, price: 0, category: '', imageUrl:'', description:'' };
  const [inputData, setInputData] = useState(INITIAL_STATE);
  // console.log(inputData);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    console.log(inputData);

    try {
      const response = await axiosPrivate.post(
        NEW_PRODUCT_URL,
        JSON.stringify(inputData)
      );
      console.log(JSON.stringify(response?.data), "response form newPRODUCT");
      setDBUpdated(prev => !prev)
      setInputData(INITIAL_STATE);
      // navigate('/admin', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mx-auto border shadow-lg px-7 py-2 bg-white rounded-2xl">
      <h4 className="text-center mb-2">Add new Product</h4>
      <form onSubmit={onFormSubmit} className={"add_product_form"}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="title of product"
          id="title"
          value={inputData.title}
          onChange={handleChange}
          className="ml-2 mb-2 border rounded-md"
        />
        <br />
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          placeholder={1}
          id="quantity"
          value={inputData.quantity}
          onChange={handleChange}
          className="ml-2 mb-2 border rounded-md"
        />
        <br />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={inputData.price}
          onChange={handleChange}
          className="ml-2 mb-2 border rounded-md"
        />
        <br />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          placeholder="category"
          id="category"
          value={inputData.category}
          onChange={handleChange}
          className="ml-2 mb-2 border rounded-md"
        />
        <br />
        <label htmlFor="imageUrl">Image Url</label>
        <input
          type="text"
          placeholder="Url"
          id="imageUrl"
          value={inputData.imageUrl}
          onChange={handleChange}
          className="ml-2 mb-2 border rounded-md"
        />
        <br />
        <label htmlFor="description">Description</label>
        <textarea
          placeholder="description"
          id="description"
          value={inputData.description}
          onChange={handleChange}
          className="ml-2 mb-2 border rounded-md"
        />
        <br />
        <button onClick={() => console.log("Added new product")} className="mt-4  mb-2 py-2 px-4 border rounded-lg">
          Add product
        </button>
      </form>
    </section>
  );
}

export default AddProductForm;
