import { createContext, useEffect, useState } from "react";
import setCartLocalStorage, { getCartLocalStorage } from "../utils/cart/cartLocalStorage";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(getCartLocalStorage());
    
    useEffect(()=>{
        console.log(cart,'cart AFTER');
        setCartLocalStorage(cart)
    },[cart])

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;