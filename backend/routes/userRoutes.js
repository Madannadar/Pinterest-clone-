// user authentication 

import express from 'express';
import { registerUser,loginUser,myProfile, userProfile, followAndUnfollow, logOutUser } from '../controllers/userControllers.js';
import { isAuth } from '../middlewears/isAuth.js';
const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",isAuth,logOutUser);
router.get("/me",isAuth,myProfile);
router.get("/:id",isAuth,userProfile);
router.post("/follow/:id",isAuth,followAndUnfollow);

export default router;