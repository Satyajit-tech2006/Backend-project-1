import { Router } from "express";
import {registeruser, userlogin,userlogout} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

// Register user
router.post("/register", upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "images", maxCount: 10 } // support multiple images
]), registeruser);
router.route("/login").post(userlogin);
router.route("/logout").post(verifyJWT,userlogout);

export default router;
