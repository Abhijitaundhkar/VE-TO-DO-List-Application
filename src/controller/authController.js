const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const generateToken = require("../config/generateJwtToken");
const { userValidationSchema } = require("../validations/validation");

exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    // Validate request body
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    //Check user exists or not
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    //encrypt the password
    const salt = await bcryptjs.genSalt(10);
    const hashPassWord = await bcryptjs.hash(password, salt);
    //save to db
    const user = await User.create({
      username,
      email,
      password: hashPassWord,
      role,
    });
    if (user) {
      return res.status(201).json({
        message: "User Register successfully",
        _id: user._id,
        username: user.username,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    //default page setting
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    //find use and add pagination based on query params
    const users = await User.find().skip(offset).limit(parseInt(limit));

    // Get the total number of users to calculate total pages
    const totalUsers = await User.countDocuments();

    // Return the paginated data along with additional pagination info
    return res.status(200).json({
      data: users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers: totalUsers,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //compare password
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || " "
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid user email or password" });
    } else {
      return res.status(200).json({
        message: "Login successfully",
        _id: user._id,
        username: user.username,
        token: generateToken(user._id, res),
      });
    }
  } catch (error) {
    return res.status(500).json({ "login error": error.message });
  }
};

exports.logoutUser = (req, res) => {
  try {
    //remove token
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    return res.status(500).json({ "logout error": error.message });
  }
};

// exports.getUserById = async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.params.id });
//     if (user) {
//       return res.status(200).json({
//         data: user,
//       });
//     } else {
//       return res.status(400).json({ message: "User Not Found" });
//     }
//   } catch (error) {
//     return res.status(500).json({ err: error.message });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     let hashPassword;
//     const { username, email, password, role } = req.body;
//     const user = await User.findById(req.params.id);
//     //if password is updated then encrypt password
//     if (password) {
//       hashPassword = await bcryptjs.hash(password, 10);
//     } else {
//       hashPassword = user.password;
//     }
//     console.log(hashPassword);
//     if (user) {
//       user.username = req.body.username || user.username;
//       user.email = req.body.email || user.email;
//       user.password = hashPassword;

//       const updatedUsers = await user.save();
//       res.status(201).json({
//         message: "User Updated successfully",
//         updatedUsers,
//       });
//     } else {
//       return res.status(404).json({ message: "user not found" });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: err.message });
//   }
// };
// exports.deleteUser = async (req, res) => {
//   try {
//     //find and deleted by id
//     const user = await User.findOneAndDelete(req.params.id);

//     if (user) {
//       if (user.role === "admin") {
//         res.cookie("jwt", "", { maxAge: 0 });
//       }
//       res.status(201).json({
//         message: "User delete successfully",
//       });
//     } else {
//       return res.status(400).json({ message: "Invalid user data" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({ error: error.message });
//   }
// };
