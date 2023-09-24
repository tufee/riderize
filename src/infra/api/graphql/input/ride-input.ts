import { IsDate, IsNotEmpty } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CreateRideInput {
  @Field()
  @IsNotEmpty()
  user_id: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  @Field()
  @IsNotEmpty()
  @IsDate()
  start_date_registration: Date;

  @Field()
  @IsNotEmpty()
  @IsDate()
  end_date_registration: Date;

  @Field({ nullable: true })
  additional_information?: string;

  @Field()
  @IsNotEmpty()
  start_place: string;

  @Field(() => Int, { nullable: true })
  participants_limit?: number;
}
