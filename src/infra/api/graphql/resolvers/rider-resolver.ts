import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Rider } from '../models/rider-models';
import { RiderInput } from '../input/rider-input';

@Resolver()
export class RiderResolver {
  @Query(() => String)
  async helloWorld() {
    return 'Hello World!';
  }

  @Mutation(() => Rider)
  async createRider(@Arg('data') data: RiderInput) {
    const test = {
      id: 'string',
      name: 'string',
      start_date: new Date(),
      start_date_registration: new Date(),
      end_date_registration: new Date(),
      additional_information: 'string',
      start_place: 'string',
      participants_limit: 1
    };

    return test;
  }
}

