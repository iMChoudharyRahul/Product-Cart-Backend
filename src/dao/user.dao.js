import userModel from "../models/user.model.js";

//check if user already available on database or not
const checkExitingUser = async (email) => {
  return await userModel.findOne({ email: email });
};

/**
 * Save New user Details on database
 */
const saveNewUserData = async ({ fullName, phoneNo, email, password }) => {
  return await userModel.create({ fullName, phoneNo, email, password });
};

/**
 * Remove the password from user response
 */
const withoutPasswordData = async (id) => {
  return await userModel.findById(id).select("-password");
};

/**
 * Find the user from
 */
const findUserByEmail = () => {};
export { checkExitingUser, saveNewUserData, withoutPasswordData };
