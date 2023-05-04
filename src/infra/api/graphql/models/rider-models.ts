import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Rider {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  start_date: Date;

  @Field()
  start_date_registration: Date;

  @Field()
  end_date_registration: Date;

  @Field()
  additional_information: string;

  @Field()
  start_place: string;

  @Field()
  participants_limit: number;
}
