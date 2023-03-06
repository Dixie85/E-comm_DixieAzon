import AdminProduct from "./AdminProduct.jsx";
import AddProductForm from "./AddProductForm.jsx";

function AdminProductList({ products, storeName, setDBUpdated }) {
  return (
    <div className="flex flex-col items-center">
      <AddProductForm setDBUpdated={setDBUpdated}/>
      <header className="my-8 text-xl" >The items in {storeName}</header>
      <div className="grid gap-2 grid-cols-1 lg:grid-cols-2 ">
        {products?.map((p) => {
          return <AdminProduct key={p.id} product={p} setDBUpdated={setDBUpdated}/>;
        })}
      </div>
    </div>
  );
}

export default AdminProductList;
