import { MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class RiderInput {
  @Field()
  id: string;

  @Field()
  @MaxLength(255)
  name: string;

  @Field()
  start_date: Date;

  @Field()
  start_date_registration: Date;

  @Field()
  end_date_registration: Date;

  @Field({ nullable: true })
  @MaxLength(255)
  additional_information: string;

  @Field()
  @MaxLength(255)
  start_place: string;

  @Field({ nullable: true })
  participants_limit: number;
}
