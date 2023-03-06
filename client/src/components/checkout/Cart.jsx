import useCart from "../../hooks/useCart.jsx";
import { clearLocalStorage } from "../../utils/cart/cartLocalStorage.jsx";
import CartItem from "./CartItem.jsx";

function Cart() {
  const { cart, setCart } = useCart();

  let sumOfItems = cart.reduce((res, p)=>{
    return res += p.cart_count;
    },0);

  let totalPrice = cart.reduce((res, p)=>{
  return res += (+p.price.slice(1) * p.cart_count);
  },0);

  const emptyCart = () => {
    setCart([]);
    clearLocalStorage();
  };

  if (cart.length === 0) {
    return <h3 className="mt-5 text-center">No items in cart, why not add some?</h3>;
  }
  return (
    <section className="flex flex-col min-h-screen max-w-7xl m-auto lg:flex-row lg:justify-center">
      <section className="flex items-center justify-around mt-3 p-3 border bg-white lg:flex-col lg:justify-start lg:w-1/4 lg:mt-0">
        <h3 className="lg:my-4"> Total price for <span className="text-green-500">{sumOfItems}</span> items <span className="text-red-600">{totalPrice.toFixed(2)}</span>$</h3>
        <button onClick={emptyCart} className="border py-2 px-3 rounded-lg bg-gray-300/70 hover:bg-red-600/80 hover:text-gray-100 hover:shadow-lg">Empty Cart</button>
      </section>
      <section className="px-3">
        {cart.map((p) => {
          return (
            <CartItem key={p.id} product={p}/>
          );
        })}
      </section>
      <section className=" hidden bg-white border lg:block lg:w-1/4"></section>
    </section>
  );
}

export default Cart;
