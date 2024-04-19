import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
const AddProduct = () => {

    const [image, setImage] = useState(false); 
    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: 'women',
        new_price: '',
        old_price: ''
    })

    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) =>{
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    }

    const ADD_PRODUCT = async () => {
        let responseData; 
        let product = productDetails;
        let formData = new FormData();
        formData.append('product', image);

        await fetch('https://shopping-website-jet.vercel.app/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData,
        })
        .then((response)=> response.json())
        .then((data)=> {responseData = data})

        if(responseData.success){
            product.image = responseData.image_url
        }

        console.log(product)
        await fetch('https://shopping-website-jet.vercel.app/addproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json', 
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify(product)
        })
        .then((response)=> response.json())
        .then((data)=>{
            data.success? alert("Product added successfully"): alert("Failed to add product")
        })
    }





  return ( 
    <div className='addProduct'>
        <div className="addProduct-itemField">
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
        </div>     
        <div className="addProduct-price">
            <div className="addProduct-itemField">
                <p>Price</p>
                <input value={productDetails.oldPrice} onChange={changeHandler} type="text" name = "old_price" placeholder='Type Here' />
            </div>
            <div className="addProduct-itemField">
                <p>Offer Price</p>
                <input value={productDetails.newPrice} onChange={changeHandler} type="text" name = "new_price" placeholder='Type Here' />
            </div>
        </div>
        <div className="addProduct-itemField">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="addProduct-itemField">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image) :upload_area} className='addproduct-thumbnail-img' alt="" />
            </label>
            <input  onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        </div>
        <button onClick={()=>{ADD_PRODUCT()}} className='addProduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct