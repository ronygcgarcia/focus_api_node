import Joi from 'joi';

const checkoutCreate = Joi.object({
  book_id: Joi.number()
    .required(),
}); 

export default checkoutCreate;