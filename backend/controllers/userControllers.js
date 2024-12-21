import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import TryCatch from "../utils/tryCatch.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = TryCatch(async (req,res) => {
    const {name, email, password} = req.body;

        let user = await User.findOne({email});

        if(user) 
            return res.status(400).json({
                message: 'User already exists'
            });

        const hashPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name, 
            email, 
            password: hashPassword
        });
        res.status(201).json({
            user,
            message: 'User registered successfully'
        })
})
export const loginUser = TryCatch(async(req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email});

    if(!user)
        return res.status(400).json({
            message: 'User not found with this email'
        });
        
        const comparePassword = await bcrypt.compare(password, user.password);
        // upar await nahi diya to with wrong password bhi login hone diya 
        if(!comparePassword) 
            return res.status(400).json({
                message: 'Invalid password'
            });
        
        generateToken(user._id,res)
            res.json({
                user,
                message: 'User logged in successfully'
            })
})

export const myProfile = TryCatch(async(req, res) => {
    const user = await User.findById(req.user._id); // getting the user id 
    res.json(user)
})

export const userProfile  = TryCatch(async(req, res) => {
    const user = await User.findById(req.params.id).select("-password"); // getting the user id 
    res.json(user);
})

export const followAndUnfollow = TryCatch(async(req, res) => { 
    const user = await User.findById(req.params.id); // getting the other user id
    const loggedInUser = await User.findById(req.user._id);

    if(!user)
        return res.status(400).json({
            message: 'User not found'
        });

    if(user._id.toString() == loggedInUser._id.toString()) return res.status(400).json({
        message: 'Cannot follow yourself'
    })

    if(user.followers.includes(loggedInUser._id)){
        const indexfollowing = loggedInUser.following.indexOf(user._id)  // user ka index jisko folllow kar rahe h 
        const indexfollowers = user.followers.indexOf(loggedInUser._id);  // apne index jisko follow karna h 

        loggedInUser.following.splice(indexfollowing, 1);
        user.followers.splice(indexfollowers, 1);
        await loggedInUser.save();
        await user.save();
        return res.json({
            message: 'User unfollowed successfully'
        });
    } else{
        loggedInUser.following.push(user._id);
        user.followers.push(loggedInUser._id);
        await loggedInUser.save();
        await user.save();
        return res.json({
            message: 'User followed successfully'
        });
    }
})

export const logOutUser = TryCatch(async(req, res) => {
    res.cookie("token", "" , {maxAge: 0});

    res.json({
        message: 'User logged out successfully'
    })
})