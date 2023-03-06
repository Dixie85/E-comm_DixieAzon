import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

function Product({ product }) {
  const { setCart } = useCart();
  const navigate = useNavigate();

  // const handleCart = (e) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     setCart(prev => {
  //         const inCart = prev.find(cartProduct => {
  //             console.log(cartProduct);
  //             return cartProduct.id === product.id});
  //         console.log(inCart);
  //         if(!inCart) {
  //            return [...prev, {...product, cart_count: 1}]
  //         } else {
  //            const filteredPrev = prev.filter(cartProduct => cartProduct.id !== product.id );
  //            return [...filteredPrev, {...inCart, cart_count:inCart.cart_count++ } ]
  //         }
  //     })

  // }

  const addToCart = (e) => {
    e.stopPropagation();
    setCart((prev) => {
      const productIndex = prev.findIndex((cartProduct) => {
        return cartProduct.id === product.id;
      });
      console.log(productIndex);
      if (productIndex >= 0) {
        const newCartState = [...prev];
        newCartState[productIndex] = {
          ...newCartState[productIndex],
          cart_count: newCartState[productIndex].cart_count + 1
        }
        return newCartState;
      } else {
        return [...prev, { ...product, cart_count: 1 }];
      }
    });
  };

  return (
    <>
      <article
        className="flex flex-col justify-evenly cursor-pointer m-2 md:m-3 shadow-lg bg-orange-200/60"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <section className='my-4 mx-2 text-center'>
          <h1 className="text-2xl mb-2">{product.title}</h1>
          <p>{product.description}</p>
        </section>
        <section className="flex pb-3 pr-1 items-center justify-evenly flex-wrap">
          <img src={product.imageUrl} alt={"picture of product"} className='my-4 mx-2 ' />
          <button className="py-4 px-6 text-xl text-gray-200 border rounded-md bg-sky-400 hover:bg-sky-600  active:bg-sky-800 active:shadow-lg focus:outline-none " onClick={addToCart}>Add to Cart</button>
        </section>
      </article>
    </>
  );
}

export default Product;
