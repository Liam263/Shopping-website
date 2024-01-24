import React from 'react'
import './NewCollections.css'
import { Item } from '../Item/Item'
import product from '../Assets/new_collections'
export const NewCollections = () => {
  return (
    <div className='new-collections'>
        <h1>New Collections</h1>
        <hr />
        <div className="new-collections-item">
            {product.map((item, i)=>{
                return <Item key={i} id = {item.id} name={item.name} image ={item.image} 
                        new_price = {item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}
