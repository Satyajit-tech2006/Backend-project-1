import asyncHandler from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
const registeruser = asyncHandler(async (req, res) => {
    const { username, email, fullname, password } = req.body;

    console.log("Body:", req.body);
    console.log("Files:", req.files);

    // 1️⃣ Validate required fields
    if ([username, email, fullname, password].some(f => !f?.trim())) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }

    // 3️⃣ Check uploaded files
    const avatarFile = req.files?.avatar?.[0];
    const imagesFile = req.files?.images?.[0];

    if (!avatarFile || !imagesFile) {
        return res.status(400).json({ error: "Avatar and images are required" });
    }

    // 4️⃣ Upload to Cloudinary
    let avatarURL, imagesURL;
    try {
        avatarURL = await uploadOnCloudinary(avatarFile.path);
        imagesURL = await uploadOnCloudinary(imagesFile.path);
    } catch (err) {
        console.error("Cloudinary error:", err);
        return res.status(500).json({ error: "Failed to upload files", details: err.message });
    }

    // 5️⃣ Create new user
    const user = new User({
        username: username.toLowerCase(),
        email,
        fullname,
        avatar: avatarURL,
        images: [imagesURL], // schema expects array
        password
    });

    // 6️⃣ Generate refresh token
    user.refreshToken = user.generateRefreshToken();

    // 7️⃣ Save user to DB
    await user.save();

    // 8️⃣ Return user (excluding password & refreshToken)
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    res.status(201).json({ message: "User registered successfully", user: createdUser });
});
const generaterefreshandaccesstoken = async (userId) => {
    try {
        const user = await User.findById(userId); // FIX: await here
        if (!user) {
            throw new ApiError(404, "User not found for token generation");
        }

        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false }); // FIX: correct option

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Failed to generate tokens");
    }
};

const  userlogin = asyncHandler(async (req, res) => {
    const {username,password,email} = req.body;
     if(!(username || email)){
        throw new ApiError(400,"Username or email are required");
     }
    const user =await User.findOne({
        $or: [{ username }, { email }]
     })
     if(!user){
        throw new ApiError(404,"User not found");
     }
     const isPasswordValid = await user.isPasswordCorrect(password);
     if(!isPasswordValid){
        throw new ApiError(401,"Invalid password");
     }

     const { accessToken, refreshToken } = await generaterefreshandaccesstoken(user._id);

     const LoggedInUser = await User.findById(user._id).select("-password -refreshToken");
     const options = {
        httpOnly: true, // Prevents client-side access to the cookie
        secure: true
     }
     return res.status(200)
     .cookie("refreshToken", refreshToken, options)
     .cookie("accessToken", accessToken, options)
     .json(
        new ApiResponse(200,{
            user: LoggedInUser,
            accessToken,
            refreshToken
        }, "User logged in successfully")
     )

});
const userlogout = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true, // Prevents client-side access to the cookie
        secure: true
     }
        return res.status(200).clearCookie("refreshToken", options).clearCookie("accessToken", options).json({message:"User logged out successfully"});

});
export{
    registeruser,
    userlogin,
    userlogout
};
