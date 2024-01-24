import React, {createContext} from "react";
import all_product from '../Components/Assets/all_product.js'

export const ShopContext = createContext(null);

const ShopContextProvider = (prop)=>{
    const contextValue = {all_product}; 

    return (
        <ShopContext.Provider value={contextValue}>
            {prop.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;