import { createContext, useEffect, useState } from "react";

const SuperStoresContext = createContext({});

export const SuperStoresProvider = ({ children }) => {
    const [stores, setStores] = useState([]);
    
    useEffect(()=>{
        console.log(stores,'stores AFTER');
    },[stores])


    return (
        <SuperStoresContext.Provider value={{ stores, setStores }}>
            {children}
        </SuperStoresContext.Provider>
    )
}

export default SuperStoresContext;