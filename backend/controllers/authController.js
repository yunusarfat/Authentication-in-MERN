// const bcrypt = require("bcrypt");
// const UserModel = require("../models/User");
// const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user =  UserModel.findOne({ email });
//     if (user) {
//       return res.status(409).json({
//         message: "user already exists",
//         success: false,
//       });
//     }
//     userModel.password = await bcrypt.hash(password, 10);
//     const userModel = await UserModel({ name, email, password });
//     await userModel.save();
//     res.status(201)
//       .json({ message: "user created successfully", success: true });
//   } catch (err) {
//     res.status(500).json({
//       message: "internal server error",
//       success: false,
//     });
//   }
// };
// module.exports = {
//   signup,
// };
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({ name, email, password: hashedPassword });

    // Save the user
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error:", err); // Log the error for debugging
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "User already exists",
        success: false,
      });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_SECRET,

      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      message: "login success",
      success: true,
      jwtToken,
      email,
      name:user.name
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = { signup, login };
