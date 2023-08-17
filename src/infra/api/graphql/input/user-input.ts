import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { User } from '../models/user-model';

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsEmail()
  emailConfirmation: string;

  @Field()
  password: string;

  @Field()
  passwordConfirmation: string;
}
