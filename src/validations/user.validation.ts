import joi from "joi";

const UserValidation = joi.object({
  username: joi.string().max(25).required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
  profilePicture: joi.string().uri().optional()
});

export default UserValidation;
