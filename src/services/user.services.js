import { ApiError } from "../utils/apiError.utils.js";
import {
  checkExitingUser,
  saveNewUserData,
  withoutPasswordData,
} from "../dao/user.dao.js";

export default class UserService {
  /**
   * Register New User
   * @param {*} fullName
   * @param {*} phoneNo
   * @param {*} email
   * @param {*} password
   * @returns {result}
   */
  newUserService = async (fullName, phoneNo, email, password) => {
    //step-3 --> check if user already exists: username, email
    let response = await checkExitingUser(email);
    if (response) {
      throw new ApiError(
        409,
        "User Already registered. Please log in or use a different email"
      );
    }

    //now save all data on database
    const newUserRes = await saveNewUserData({
      fullName,
      phoneNo,
      email,
      password,
    });

    if (!newUserRes._id) {
      throw new ApiError(
        500,
        "data not found! something goes wrong while save new user "
      );
    }
    //remove the password from response
    const result = await withoutPasswordData(newUserRes._id);
    return result;
  };

  /**
   * Login User Service Api
   * @param {*} email
   * @param {*} password
   * @returns {userDetails}
   */
  loginUserServices = async (email, password) => {
    //find the email id
    const userData = await checkExitingUser(email);
    if (!userData) {
      throw new ApiError(404, "User Not Found! invalid email and password");
    }

    //then check the password is correct or not
    let isCorrectPassword = await userData.isPasswordCorrect(password);
    if (!isCorrectPassword) {
      throw new ApiError(401, "email & Password is wrong");
    }
    //remove the password from response
    const userDetails = await withoutPasswordData(userData._id);

    return userDetails;
  };
}
