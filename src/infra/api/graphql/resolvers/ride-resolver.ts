import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { CreateRideUseCase } from '../../../../domain/usecases/create-ride-usecase';
import logger from '../../../helper/logger';
import { RideRepository } from '../../repositores/prisma/ride-repository';
import { CreateRideInput } from '../input/ride-input';
import { Ride } from '../type/ride-type';

@Service()
@Resolver()
export class RideResolver {
  constructor(
    private readonly createRideUseCase: CreateRideUseCase,
    private readonly rideRepository: RideRepository
  ) { }

  @Mutation(() => Ride)
  @Authorized()
  async create(@Arg('data') data: CreateRideInput): Promise<Omit<Ride, 'id'>> {
    try {
      return await this.createRideUseCase.execute(data);
    } catch (error: any) {
      logger.warn(error);
      throw new Error(error);
    }
  }

  @Query(() => [Ride], { nullable: true })
  @Authorized()
  async findByUserId(@Arg('user_id') user_id: string): Promise<Ride[] | null> {
    try {
      return await this.rideRepository.findByUserId(user_id);
    } catch (error: any) {
      logger.warn(error);
      throw new Error(error);
    }
  }

  @Query(() => [Ride], { nullable: true })
  @Authorized()
  async findAll(): Promise<Ride[] | null> {
    try {
      return await this.rideRepository.findAll();
    } catch (error: any) {
      logger.warn(error);
      throw new Error(error);
    }
  }
}

