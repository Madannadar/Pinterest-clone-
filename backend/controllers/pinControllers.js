import { Pin } from "../models/pinModel.js";
import TryCatch from "../utils/tryCatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";

export const createPin = TryCatch(async (req, res) => {
    const { title, pin } = req.body;

    const file = req.file;
    console.log(file);
    const fileUrl = getDataUrl(file);

    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

    await Pin.create({
        title,
        pin,
        image:{
            id:cloud.public_id,
            url: cloud.secure_url,
        },
        onwer: req.user._id, 
    });

    res.json({
        message: "Pin created successfully",
    });
});

export const getAllPins = TryCatch(async (req, res) => {
    const pins = await Pin.find().sort({ createAt: -1});

    res.json(pins);
});

export const getSinglePin = TryCatch(async (req, res) => {
    const pin = await Pin.findById(req.params.id).populate("onwer","-password");

    res.json(pin);
})

export const commentOnPin = TryCatch(async(req,res) => {
    const pin = await Pin.findById(req.params.id); 

    if(!pin)
        return res.status(404).json({
            message: "Pin not found",
        });

        pin.comments.push({
            user:req.user._id,
            name: req.user.name,
            comment: req.body.comment,
        });
        await pin.save();

        res.json({
            message: "Comment added successfully",
        });
})

export const deleteComment = TryCatch(async(req, res) => {
    const pin = await Pin.findById(req.params.id);

    if(!pin)
        return res.status(404).json({
            message: "Pin not found",
        });

        if(!req.query.commentId) 
            return res.status(404).json({
                message: "Comment id not provided",
            });

            const commentIndex = pin.comments.findIndex(item => item._id.toString() === req.query.commentId.toString());
        
        if(commentIndex === -1){
            return res.status(404).json({
                message: "Comment not found",
            });
        }
        
        const comment = pin.comments[commentIndex]

        if(comment.user.toString()=== req.user._id.toString()){
            pin.comments.splice(commentIndex, 1);

            await pin.save();

            return res.json({
                message: "Comment deleted successfully",
            });
        }else{
            return res.status(403).json({
                message: "you are not onwer of the comment",
            });
        }
})

export const deletePin = TryCatch(async(req,res) => {
    const pin = await Pin.findById(req.params.id)

    if(!pin)
        return res.status(404).json({
            message: "Pin not found",
        });

    if(pin.onwer.toString()!== req.user._id.tostring()) 
        return res.status(403).json({
            message: "Unauthorized",
        });

        await cloudinary.v2.uploader.destroy(pin.image.id);
        await pin.deleteOne();

        res.json({
            message: "Pin deleted successfully",
        });
})

export const updatePin = TryCatch(async(req, res) => {
    const pin = await Pin.findById(req.params.id);

    if(!pin){
        return res.status(400).json({
            message: "Pin not found",
        });

        if(pin.onwer.toString()!== req.user._id.toString())
            return res.status(403).json({
                message: "Unauthorized",
            });

            pin.title = req.body.title;
            pin.pin = req.body.pin;

            await pin.save();

            res.json({
                message: "Pin updated successfully",
            });
    }
})