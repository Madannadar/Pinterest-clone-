import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        // minlength:8,
    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId, // jo id h follows ka wo authenticated hai kya 
        ref: 'User'
    }],
    following:[{
        type: mongoose.Schema.Types.ObjectId, // jo id h follows ka wo authenticated hai kya 
        ref: 'User'
    }],

},
{
    timestamps: true, // createdAt and updatedAt fields will be added automatically
}
);

export const User = mongoose.model("User", schema)