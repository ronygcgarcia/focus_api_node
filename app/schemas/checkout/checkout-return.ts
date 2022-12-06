import Joi from 'joi';

const checkoutReturn = Joi.object({
  status: Joi.boolean()
    .required(),
}); 

export default checkoutReturn;