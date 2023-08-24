import { Field, ObjectType } from 'type-graphql';
import { IUser, IUserWithoutPassword } from '../../../../domain/interfaces/User';

@ObjectType()
export class User implements IUser {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class UserWithoutPassword implements IUserWithoutPassword {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
