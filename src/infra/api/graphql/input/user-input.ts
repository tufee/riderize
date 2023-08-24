import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IUserRequest } from '../../../../domain/interfaces/User';

@InputType()
export class UserInput implements IUserRequest {
  @Field()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsEmail()
  emailConfirmation: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  passwordConfirmation: string;
}
