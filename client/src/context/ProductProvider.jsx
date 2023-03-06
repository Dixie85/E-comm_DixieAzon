import { createContext, useEffect, useState } from "react";

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    
    useEffect(()=>{
        console.log(products,'Products AFTER');
    },[products])


    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContext;