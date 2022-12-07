import Joi from 'joi';

const userCreate = Joi.object({
  first_name: Joi.string()
    .required(),
  last_name: Joi.string()
    .required(),
  email: Joi.string()
    .required(),
  password: Joi.string()
    .required(),
  password_confirmation: Joi.any()
    .valid(Joi.ref('password'))
    .required(),
  profile_id: Joi.number(),
}); 

export default userCreate;