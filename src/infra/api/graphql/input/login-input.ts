import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IUserLogin } from '../../../../domain/interfaces/User';

@InputType()
export class LoginInput implements IUserLogin {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
