import Joi from 'joi'

export const validateUserRegistration = (data) => {
  const schema = Joi
    .object({
      fullName: Joi.string().min(3).max(100).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      mobile: Joi.number().required(),
      role: Joi.string().valid("user", "owner", "deliveryBoy", "admin").default("user"),
    })
    .unknown(false); // blocks extra injected fields
  return schema.validate(data);
};

export const validateUserLogin = (data) => {
  const schema = Joi
    .object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    })
    .unknown(false); // blocks extra injected fields
  return schema.validate(data);
};