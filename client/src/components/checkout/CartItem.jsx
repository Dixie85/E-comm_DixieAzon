import useCart from "../../hooks/useCart";

function CartItem({ product }) {
  const { setCart } = useCart();

  const addCount = () => {
    setCart((prev) => {
      console.log(prev, 'prev');
      const productIndex = prev.findIndex(cartProduct => cartProduct.id === product.id);
      if (prev[productIndex].cart_count === 10) {
        return [...prev]
      } else {
        const newCartState = [...prev];
        newCartState[productIndex] = {
          ...newCartState[productIndex],
          cart_count: newCartState[productIndex].cart_count + 1
        }
        return newCartState;
      }
    });
  };

  const subtractCount = () => {
    setCart((prev) => {
      const productIndex = prev.findIndex((cartProduct) => cartProduct.id === product.id);
      if (prev[productIndex].cart_count === 1) {
        return [...prev]
      } else {
        const newCartState = [...prev];
        newCartState[productIndex] = {
          ...newCartState[productIndex],
          cart_count: newCartState[productIndex].cart_count - 1
        }
        return newCartState;
      }
    });
  };

  const removeFromCart = () => {
    setCart((prev) => prev.filter(cartProduct => cartProduct.id !== product.id));
  };

  return (
    <article className="flex justify-between border px-1 py-3 my-3 rounded-lg bg-white shadow-md">
      <div className="flex flex-2 p-1 mr-2">
        <img src={product.imageUrl} alt={"picture of product"} className='m-auto max-w-[100px] min-h-[50px] rounded-2xl'/>
      </div>
      <div className="flex-1 ">
        <section className="flex text-sm borde">
          <h2 className="flex flex-1 items-center">{product.title}</h2>
          <div className="my-1 mr-5 leading-relaxed">
            <h3 className="underline">Amount: {product.cart_count}</h3>
            <h3 className="underline">Price {product.price}</h3>
          </div>
        </section>
        <section className="flex">
          <button onClick={removeFromCart} className=" text-[12px] leading-none p-1 border rounded-xl mr-5 hover:bg-red-500/90 hover:text-gray-100 hover:shadow-md">
            Remove from Cart
          </button>
          <div className="flex w-full">
            <button onClick={subtractCount} className=" border rounded-xl flex-1 mr-5 hover:bg-rose-100 hover:shadow-md">-</button>
            <button onClick={addCount} className=" border rounded-xl flex-1 mr-5 hover:bg-green-100 hover:shadow-md">+</button>
          </div>
        </section>
      </div>
    </article>
  );
}

export default CartItem;
