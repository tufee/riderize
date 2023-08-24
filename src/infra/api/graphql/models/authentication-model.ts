import { Field, ObjectType } from 'type-graphql';
import { IToken } from '../../../interfaces/authentication/authentication';

@ObjectType()
export class AuthenticationToken implements IToken {
  @Field()
  token: string;
}
