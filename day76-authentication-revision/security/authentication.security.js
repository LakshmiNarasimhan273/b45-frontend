const userModel = require("../models/users.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// registerAPI
const registerApi = async (req, res) => {
  try {
    const {email, password} = req.body;

    // logic 1
    const emailCheck = await userModel.findOne({ email });

    if(emailCheck){
        return res.status(400).json({success: false, message: "User account already exists"});
    };

    // logic 2
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({email, password: hashedPassword});

    res.status(201).json({success: true, message: "Registration Successful"});

  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "User registration failed" });
  }
};

// loginAPI
const loginApi = async (req, res) => {
    try{

        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(401).json({success: false, message: "User account not found, Register first"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).json({success: false, message: "Invalid credentials"});
        }

        // token generation
        const token = jwt.sign(
            {userId: user._id, email: user.email},
            process.env.jwtSecret,
            {expiresIn: "24h"}
        );

        res.status(200).json({success: true, token});

    }catch(err){
         res.status(500).json({success: false, message: "Login Failed"});
    }
}

module.exports = {registerApi, loginApi};