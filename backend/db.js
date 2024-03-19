
const mongoose = require('mongoose');
const { mongoServer } = require('./config');

// Connect to MongoDB
mongoose.connect(mongoServer);

// Define schemas
const UserSchema = new mongoose.Schema({
    // Schema definition here
    username :{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
    },
    firstName : {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName : {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});


const AccountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        reuired:true
    },
    balance:{
        type:Number,
        requred:true
    }
})
const User = mongoose.model('User',UserSchema);
const Account = mongoose.model('Account',AccountSchema);
module.exports={
    User,
    Account
}