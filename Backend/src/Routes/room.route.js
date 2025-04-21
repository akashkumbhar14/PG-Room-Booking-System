import { Router } from "express";
import { createRoom } from "../controllers/room.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/create").post(
    upload.fields([
      {
        name: "images",
        maxCount: 5
      }
    ]),
    createRoom
  );

export default router