import { createContext, useEffect, useState } from "react";

const StoreContext = createContext({});

export const StoreProvider = ({ children }) => {
    const [store, setStore] = useState({});
    
    useEffect(()=>{
        console.log(store,'store AFTER');
    },[store])


    return (
        <StoreContext.Provider value={{ store, setStore }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContext;