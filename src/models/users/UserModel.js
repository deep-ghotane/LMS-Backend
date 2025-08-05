import User from "./UserSchema.js";

//create user
export const createNewUser = (userObj) => {
  return User.insertOne(userObj);
};

//get user by email
export const getUserByEmail = ({ email: email }) => {
  return User.findOne({ email: email });
};

// get user by filter
export const getUser = (filter) => {
  // filter: {email: 'email'}
  // filter: {username: 'name'}
  return User.findOne(filter);
};
// update user
export const updateUser = (id, updateObj) => {
  return User.findByIdAndUpdate(id, updateObj);
};
