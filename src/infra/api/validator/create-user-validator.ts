import Joi from 'joi';
import { IUser } from '../../../domain/usecases/create-user-dto';

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  emailConfirmation: Joi.valid(Joi.ref('email')).required(),
  password: Joi.string().min(8).required(),
  passwordConfirmation: Joi.valid(Joi.ref('password')).required(),
});

export function validateUser(user: IUser) {
  const { error } = userSchema.validate(user, { abortEarly: true });
  if (error) {
    const errors = error.details.map((err) => err.message);
    return { error: errors };
  }
  return { value: user };
}

