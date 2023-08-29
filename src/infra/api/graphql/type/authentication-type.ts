import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthenticationToken {
  @Field()
  token: string;
}
