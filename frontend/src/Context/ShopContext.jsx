import React, {createContext, useEffect, useState} from "react";
// import all_product from '../Components/Assets/all_product.js'

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {}; 
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0
    }
    return cart;
}

const ShopContextProvider = (prop)=>{
    const [all_product, setAllProduct] = useState([]); 

    const [cartItems, setCartItems] = useState(getDefaultCart())

    useEffect(()=>{
        fetch('https://shopping-website-jet.vercel.app/allProducts')
        .then((respone)=> respone.json())
        .then((data)=>setAllProduct(data))

    if(localStorage.getItem('auth-token')) {
        fetch('https://shopping-website-jet.vercel.app//getcart', {
            method: 'POST', 
            headers: {
                Accept: 'application/form-data',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
            body:""
        }).then( (res)=> res.json())
        .then((data)=> setCartItems(data))

    }
    },[])
    // console.log(all_product)

    const addToCart = (itemId) =>{
        setCartItems( (prev)=> ({...prev, [itemId]:prev[itemId]+1}))

        if(localStorage.getItem('auth-token')){
            fetch('https://shopping-website-jet.vercel.app/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId": itemId})
            })
            .then((response) => response.json())
            .then((data)=> console.log(data))
            
        }
    }

    const removeFromCart = (itemId) =>{
        setCartItems( (prev)=> ({...prev, [itemId]:prev[itemId]-1}));
        if(localStorage.getItem('auth-token')){
            fetch('https://shopping-website-jet.vercel.app//removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId": itemId})
            })
            .then((response) => response.json())
            .then((data)=> console.log(data))
            
        }
    }

    const getTotalCartAmount =()=> {
        let totalAmount = 0; 
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=> product.id===Number(item))
                totalAmount += itemInfo.new_price *cartItems[item]
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = ()=> {
        let totalItems = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    }


    const contextValue = {all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems}; 
    
    return (
        <ShopContext.Provider value={contextValue}>
            {prop.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;