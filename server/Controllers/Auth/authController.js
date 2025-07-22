const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')


const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};




const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email: email });

    if (!checkUser) {
      return res.json({
        success: false,
        message: "user dosen't exists"
      })
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.json({
        success: false,
        message: "Invalid Credentials"
      })
    }

    const token = jwt.sign({
      id: checkUser._id, role: checkUser.role, email: checkUser.email
    }, process.env.SECRET_KEY)

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,         // Set to true only in production with HTTPS
      sameSite: "None",       // Use "None" if frontend/backend are on different origins with HTTPS
      maxAge: 1000 * 60 * 60 * 24,
    }).json({
      success: true,
      message: "Login Successfull",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id
      }
    })

  }
  catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occoured"
    })
  }
}

const logoutUser = async (req, res) => {
  res.clearCookie('token').json({
    success: true,
    message: 'Logged out Successfully'
  })
}

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({
    success: false,
    message: 'Unauthorized User'
  })

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next()
  }
  catch {
    res.status(401).json({
      success: false,
      message: 'something went wrong'
    })
  }
}

module.exports = { registerUser, LoginUser, logoutUser, authMiddleware }

