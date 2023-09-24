import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Inscription {
  @Field()
  ride_id: string;

  @Field()
  user_id: string;

  @Field()
  subscription_date: Date;
}
