import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { CreateRideUseCase } from '../../../../domain/usecases/create-ride-usecase';
import logger from '../../../helper/logger';
import { CreateRideInput } from '../input/ride-input';
import { Ride } from '../type/ride-type';

@Service()
@Resolver()
export class RideResolver {
  constructor(
    private readonly createRideUseCase: CreateRideUseCase
  ) { }

  @Mutation(() => Ride)
  @Authorized()
  async create(@Arg('data') data: CreateRideInput): Promise<CreateRideInput> {
    try {
      return await this.createRideUseCase.execute(data);
    } catch (error: any) {
      logger.warn(error);
      throw new Error(error);
    }
  }
}

