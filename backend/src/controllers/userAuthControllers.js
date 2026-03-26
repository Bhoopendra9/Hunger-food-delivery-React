import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import logger from "../utils/logger.js";
import {
  validateUserLogin,
  validateUserRegistration,
} from "../utils/validations.js";

//Register a new user
export const registerUser = async (req, res) => {
  return res.status(200).json(new ApiResponse(200, "User registered successfully", []));
  //TODO: Add otp verification for email and mobile number
  logger.info("Registering a new user with data: " + JSON.stringify(req.body));
  try {
    const { error, value } = validateUserRegistration(req.body);
    if (error) {
      logger.error(" Joi Validation error: " + error.details[0].message);
      throw new ApiError(400, error.details[0].message);
    }

    const { fullName, email, password, mobile, role } = value;

    const exitingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (exitingUser) {
      logger.error("User already exists with email or username");
      new ApiResponse(500, "User Already exits", []);
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
      mobile,
      role,
    });

    // remove sensitive data before sending response
    const createdUser = await User.findById(newUser._id).select("-password");

    if (!createdUser) {
      logger.error("User creation failed");
      new ApiResponse(500, "User creation failed", []);
    }

    // send response
    return res
      .status(201)
      .json(new ApiResponse(201, "User registered successfully", createdUser));
  } catch (error) {
    logger.error("Error in user registration: " + error.message);
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          error.message || "Internal Server Error",
          [],
        ),
      );
  }
};

//Login user
export const loginUser = async (req, res) => {
  //get data from body
  // validation for username and password
  // check user
  // check password
  // generate access and refresh token
  // send response with token
  logger.info("Logging in user with data: " + JSON.stringify(req.body));
  try {
    const { error, value } = validateUserLogin(req.body);
    if (error) {
      logger.error(" Joi Validation error: " + error.details[0].message);
      throw new ApiError(400, error.details[0].message);
    }
    const { email, password } = value;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      logger.error("User not found with email: " + email);
      throw new ApiError(404, "User not found with this email");
    }

    const isPasswordMatch = await user.isPasswordCorrect(password);
    if (!isPasswordMatch) {
      logger.error("Invalid password for email: " + email);
      throw new ApiError(401, "Invalid password");
    }

    const accessToken = user.generateAccessToken();

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(200, "User logged in successfully", {
          user: userData,
          accessToken,
        }),
      );
  } catch (error) {
    logger.error("Error in user login: " + error.message);
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          error.message || "Internal Server Error",
          [],
        ),
      );
  }
};

//Logout user
export const logoutUser = async (req, res) => {
  try {
  } catch (error) {

  }
};
