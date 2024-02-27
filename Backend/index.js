const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const cookieParser = require('cookie-parser');
const LogInCollection = require("./mongodb");
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

const projPath = path.join(__dirname,'../');
app.use(express.static(projPath));

// Set the views directory to your HTML files
app.set('views', projPath);

app.get('/signup', (req, res) => {
    // Render the signup.html file
     res.sendFile(path.join(projPath, 'signup.html'));
   
});

app.get('/', (req, res) => {
    // Render the login.html file
    res.sendFile(path.join(projPath, 'login.html'));
});

app.post('/signup', async (req, res) => {
    const data = {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password,
    };

    try {
        const checking = await LogInCollection.findOne({ username: req.body.username });

        if (checking && checking.password === req.body.password) {
            res.send("User details already exist");
        } else {
            await LogInCollection.insertMany([data]);
            let time = 60*1000*60*30;
            res.cookie("username",req.body.username,{maxAge:time})
            res.status(201).sendFile(path.join(projPath, 'login.html'));
        }
    } catch (error) {
        res.send("Wrong inputs");
    }
});

app.post('/login', async (req, res) => {
    // try {
      console.log(req.body.password);
        const check = await LogInCollection.findOne({ username: req.body.username,password:req.body.password });
        console.log(check)
        if (check!==null) {
          let time = 60*1000*60*30;
          res.cookie("username",req.body.username,{maxAge:time})
            res.status(201).sendFile(path.join(projPath, 'index.html'));
        } else {
            res.send("Incorrect password");
        }
    // } catch (error) {
    //     res.send("Wrong details");
    // }
});


const cartItemSchema = new mongoose.Schema({
    productId: {type: String, required: true},
    quantity: {type: Number, required: true},
    username:{type:String,required:true}
  });
  
  
  const CartItem = mongoose.model('CartItem', cartItemSchema);
  
  app.use(bodyParser.json());
  
  // Get all cart items
  app.get('/cartItems', async (req, res) => {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  });
  
  app.get('/cart',async(req,res)=>{
    let username = req.cookies.username;
    console.log(username);
    let user = await LogInCollection.findOne({username:username});
    if(user){
      console.log("Cart Items",user.cartItems);
      res.json(user.cartItems)
    }
  })

  app.post('/addItem',async (req,res)=>{
    let username = req.cookies.username;
    console.log(username);
    let user = await LogInCollection.findOne({username:username});
    
    if(user){
      user.cartItems=req.body.cartItems;
      console.log(req.body);
      user.save();
    }
  })

  
  app.post('/cartItems', async (req, res) => {
    const newCartItem = new CartItem({
      productId: req.body.productId,
      quantity: req.body.quantity,
      username:req.body.username
    });
  
    await newCartItem.save();
    res.json(newCartItem);
  });
  
 
  app.put('/cartItems/:id', async (req, res) => {
    const updatedCartItem = await CartItem.findByIdAndUpdate(req.params.id, {
      quantity: req.body.quantity,
    }, {new: true});
  
    res.json(updatedCartItem);
  });
  
  
  app.delete('/cartItems/:id', async (req, res) => {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({message: 'Cart item deleted successfully'});
  });

app.listen(port, () => {
    console.log('Server is running on port', port);
});
