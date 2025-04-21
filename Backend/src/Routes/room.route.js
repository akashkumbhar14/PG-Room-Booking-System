import { Router } from "express";
import { addRoom } from "../controllers/room.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/add").post(
  verifyJWT,
  upload.array("images",5),
  addRoom
);


export default router