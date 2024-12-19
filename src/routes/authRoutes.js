const express = require("express");
const {
  registerUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUserById,
  loginUser,
  logoutUser,
} = require("../controller/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//all register and login routes

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user title
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *
 */
router.post("/signup", registerUser);
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *
 */
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.get("/", getAllUser);

// router.put("/updateUser/:id", protect, updateUser);
// router.delete("/removeUser/:id", protect, deleteUser);
//router.get("/:id", getUserById);

module.exports = router;
