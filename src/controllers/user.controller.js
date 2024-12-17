//Import Module
import UserService from "../services/user.services.js";
import { ApiError } from "../utils/apiError.utils.js";
import { ApiResponse } from "../utils/apiResponse.util.js";

let userService = new UserService();

export default class UserController {
  /**
   * Register User:
   *
   * Writing Api Steps
   *  step-1 --> get user details from fronted --> done
   *  step-2 --> Do some validation --> empty Check --> done
   *  step-3 --> check if user already exists: username, email --> mongodb  --> done
   *  step-4 --> save all details on mongodb
   *  step-5 --> remove password from response
   *  step-6 --> send all response to user  with status code 201
   */
  /**
   * After Testing Checking some point
   * step-1 --> password remove checking
   * step 2 --> check data is created or not on database
   */

  registerNewUser = async (req, res) => {
    try {
      let { fullName, phoneNo, email, password } = req.body;
      //first we validate our data
      if (
        [fullName, phoneNo, email, password].some(
          (eachItem) => eachItem?.trim() === ""
        )
      ) {
        throw new ApiError(400, "Please enter all fields");
      }
      // Email format validation using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).send({ msg: "Invalid email format" });
      }
      let response = await userService.newUserService(
        fullName,
        phoneNo,
        email,
        password
      );
      console.log("Check Response on Controller:", response);
      res
        .status(201)
        .json(new ApiResponse(201, response, "User registered successfully!"));
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  };

  /**
   *
   * step-1 --> Get Data From Fronted/postman--> email/username, password
   * step-2 --> validation add
   * step-3 --> get the user according to over recived data --> username || email
   * step-4 --> check the password is correct or not --> isPasswordCorrect methord
   * step-5 --> set the error according to response  --> if password not match
   * step-6 --> access and refresh token generate and send in json format
   * step-6 --> remove the password from response
   * step-7 --> finaly send the response
   */
  loginUser = async (req, res) => {
    try {
      let { email, password } = req.body;
      // Check if email exists and is not empty
      if (!email || typeof email !== "string" || email.trim() === "") {
        return res.status(400).send({ msg: "Valid email is required" });
      }
      // Email format validation using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).send({ msg: "Invalid email format" });
      }

      // Check if password exists and is not empty
      if (!password || typeof password !== "string" || password.trim() === "") {
        return res.status(400).send({ msg: "Password is required" });
      }

      const result = await userService.loginUserServices(email, password);

      res
        .status(200)
        .json(
          new ApiResponse(200, { user: result }, "User logged In Successfully")
        );
    } catch (error) {
      throw new ApiError(400, "something wrong on LoginUserApi", error.message);
    }
  };
}
