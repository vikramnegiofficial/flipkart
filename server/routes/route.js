import express from "express";
// import userSignUp from "../controller/userController.js";
import UserController from "../controller/userController.js";
import checkUserAuth from "../middlewares/authMiddleware.js";

const router = express.Router();
// router.post("/signup", userSignUp);

// Route Level Middleware
router.use("/changepassword", checkUserAuth);
router.use("/loggeduser", checkUserAuth);

// Pubile Routes
router.post("/signup", UserController.userRegistration);
router.post("/signin", UserController.userLogin);
router.post("/password-reset-link", UserController.sendResetPassLinkViaEmail);
router.post(
  "/resetpassword/:id/:token",
  UserController.userPasswordResetViaMail
);

// Private Routes
router.post("/changepassword", UserController.changeUserPassword);
router.use("/loggeduser", UserController.loggedUser);

export default router;
