const port = 4000; 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json()); 
app.use(cors());

// Database connection with MONGODB atlas
// go to MongoDB atlas -> create new prj -> create database and get the connection link
mongoose.connect("mongodb+srv://lamnguyen263:Lamnguyen263@cluster0.6jwfaqb.mongodb.net/shopping-website")

// API creation
app.get('/', (req, res) => {
    res.send("Express App is running")
})

//Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({storage: storage})

//Create Upload endpoint for images
app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'),(req,res)=>{
    res.json({
        success: 1, 
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//Schema for Creating products 

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    image: {
        type: String, 
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    new_price: {
        type: Number, 
        required: true
    },
    old_price: {
        type: Number, 
        required: true
    }, 
    date: {
        type: Date, 
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }

})

app.post('/addproduct', async(req, res)=>{
    let products = await Product.find({}); 

    //Auto-generated ID, increae ID by 1 according to the previous
    let id; 
    if (products.length > 0){
        let last_product_array = products.slice(-1); 
        let last_product = last_product_array[0]; 
        id = last_product.id +1; 
    }else {
        id =1; 
    }


    const product = new Product({
        id: id, 
        name : req.body.name,
        image : req.body.image, 
        category : req.body.category,
        new_price: req.body.new_price, 
        old_price: req.body.old_price, 

    })
    console.log(product);
    await product.save(); 
    console.log("Saved"); 
    res.json({
        success: true, 
        name: req.body.name
    })
})

//Creating API for deleting product
// using findOneAndDelete in Mongoose
app.post('/removeProduct', async (req, res) => {
    await Product.findOneAndDelete({id:req.body.id})
    console.log("removed")
    res.json({
        success: true, 
        name: req.body.name
    })
})

//Creating API for getting all products
app.get('/allProducts', async (req, res) => {
    let products = await Product.find({})
    console.log("All product FETCHED"); 
    res.send(products);
})

//Schema creating for Users model 
const Users = mongoose.model('Users', {
    name : {
        type: String
    }, 
    email: {
        type: String, 
        unique: true
    }, 
    password: {
        type: String
    }, 
    cartData: {
        type: Object
    }, 
    date: {
        type: Date, 
        default: Date.now
    }
})

//Creating Endpoint for registering the user 
app.post('/signup', async (req,res)=>{
    
    let check = await Users.findOne({email: req.body.email})
    if(check) {
        return res.status(400).json({success:false, error: "existing user already registered with this email"})
    }

    let cart = {}; 
    for( let i = 0; i <300; i++){
        cart[i]=0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email, 
        password: req.body.password, 
        cartData: cart, 
    })

    await user.save(); 

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom'); 
    res.json({success:true, token})
})

//creating endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({email: req.body.email}); 
    if(user){
        const passCompare = req.body.password === user.password; 
        if(passCompare){
            const data = {
                user: {
                    id: user.id
                }
            }

            const token = jwt.sign(data, 'secret_ecom');

            res.json({success:true, token});
        }else {
            res.json({success:false, error: "Wrong password"})
        }
    } else {
        res.json({success:false, error: "Wrong email ID"})
    }
})

//Creating endpoint for newcollection data
app.get('/newcollection', async (req, res) => {
    let products = await Product.find({}); 
    let newcollection = products.slice(1).slice(-8); 
    console.log("New collection fetched")
    res.send(newcollection)
})

//Creating endpoint for popular in women section
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({category: 'women'}); 
    let popularInWomen = products.slice(0,4); 
    console.log("Popular in Women fetched")
    res.send(popularInWomen); 
})

//creating middleware for fetch user 
const fetchUser = async (req, res,next) => {
    const token = req.header('auth-token');
    if (!token){
        res.status(401).send({errors: "please authenticate using valid token 1"})
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next(); 
        }catch (error) {
            res.status(401).send({error: "Please authenticate a valid token"})
        }
    }
}

//Creating endpoint to adding products from cartData
app.post('/addtocart',fetchUser,  async (req, res) => {
    console.log("Added " ,req.body.itemId, req.user)
    // console.log(req.body, req.user)
    let userData = await Users.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1; 
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData} )
    res.send("Product added")
})

//creating endpoint to remove products from cartData
app.post('/removefromcart',fetchUser, async (req, res)=> {
    console.log("removed " ,req.body.itemId, req.user)
    let userData = await Users.findOne({_id: req.user.id});
    if(userData.cartData[req.body.itemId]>0){
        userData.cartData[req.body.itemId] -= 1; 
        await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData} )
        res.send("Product removed -1 ")
    }
    
});

//Creating endpoint to show cart data
app.post('/getcart',fetchUser, async (req, res)=> {
    console.log("GEt cart"); 
    let userData = await Users.findOne({_id: req.user.id});
    res.json(userData.cartData);
})


app.listen(port, (error)=>{
    if(!error){
        console.log("Server listening on port " + port)
    }
    else console.log("Error: "+ error)
});