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
 *     Auth:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password for the user account
 *       example:
 *         username: Alexander K. Dewdney
 *         email: abc@gmail.com
 *         password: secretPassword123
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User authentication and management API
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: User already exists
 */
router.post("/signup", registerUser);

router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.get("/allUser", getAllUser);

// router.put("/updateUser/:id", protect, updateUser);
// router.delete("/removeUser/:id", protect, deleteUser);
//router.get("/:id", getUserById);

module.exports = router;
