import { Field, InputType } from 'type-graphql';

@InputType()
export class UserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  emailConfirmation: string;

  @Field()
  password: string;

  @Field()
  passwordConfirmation: string;
}
