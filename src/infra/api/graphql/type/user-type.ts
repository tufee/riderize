import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
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
export class UserWithoutPassword implements Omit<User, 'password'> {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
