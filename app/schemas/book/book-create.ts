import Joi from 'joi';

const bookCreate = Joi.object({
  title: Joi.string()
    .required(),
  description: Joi.string()
    .required(),
  author: Joi.string()
    .required(),
  link_image: Joi.string()
    .required(),
  publish_year: Joi.number()
    .required(),
  genre_id: Joi.number()
    .required(),
  stock: Joi.number()
    .required(),
}); 

export default bookCreate;