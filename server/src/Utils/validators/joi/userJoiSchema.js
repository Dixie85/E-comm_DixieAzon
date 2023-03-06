import Joi from "joi";

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const userSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
  }).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  confirm_password: Joi.ref("password"),
  role: Joi.string().required(),
  access_token: [Joi.string(), Joi.number()],
})
.with("password", "confirm_password")
.xor("password", "access_token");

const userLogInSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
  }).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  access_token: [Joi.string(), Joi.number()],
})
  .xor("password", "access_token");

export const validateNewUser = validator(userSchema);
export const validateLogInUser = validator(userLogInSchema);
