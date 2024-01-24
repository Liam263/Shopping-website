import React from 'react'
import './Popular.css'
import product from '../Assets/data.js'
import   {Item}  from '../Item/Item.jsx'
export const Popular = () => {
  return (
    <div className='popular'>
        <h1>Popular in Women</h1>
        <hr />
        <div className="popular-item">
            {product.map((item, i)=>{
                return <Item key={i} id = {item.id} name={item.name} image ={item.image} 
                        new_price = {item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}
