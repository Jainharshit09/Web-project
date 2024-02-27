const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/birdeye")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const SignUpSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    }
    ,

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    contact:{
        type:String,
        required:true
    }
});

const logInSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cartItems:[
        {
            productId: {type: String, required: true},
            quantity: {type: Number, required: true},
        }
    ]
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)


module.exports=LogInCollection
