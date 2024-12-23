import express from 'express';
import { isAuth } from '../middlewears/isAuth.js';
import { commentOnPin, createPin, deleteComment, deletePin, getAllPins, getSinglePin, updatePin } from '../controllers/pinControllers.js';
import uploadFile from '../middlewears/multer.js';

const router = express.Router();

router.post("/new",isAuth, uploadFile, createPin);
router.get("/all",isAuth, getAllPins);
router.get("/:id",isAuth, getSinglePin);
router.post("/comment/:id",isAuth, getSinglePin, commentOnPin);
router.delete("/comment/:id",isAuth, deleteComment);
router.delete("/:id",isAuth, deletePin)
router.put("/:id",isAuth, updatePin)

export default router;