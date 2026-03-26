import express from "express";
import { loginUser, registerUser } from "../controllers/userAuthControllers.js";


const router = express.Router();

/*  #swagger.tags = ['Users']
    #swagger.summary = 'Register a new user'
*/
router.post("/register", registerUser);
router.get("/test", (req, res) => {
  res.status(200).json({ message: "User route is working" });
});


/*  #swagger.tags = ['Users']
    #swagger.summary = 'Login user'
*/
router.post("/login", loginUser);

export default router;
