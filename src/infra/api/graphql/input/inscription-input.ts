import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class InscriptionInput {
  @Field()
  @IsNotEmpty()
  ride_id: string;

  @Field()
  @IsNotEmpty()
  user_id: string;

  @Field()
  @IsNotEmpty()
  subscription_date: Date;
}
