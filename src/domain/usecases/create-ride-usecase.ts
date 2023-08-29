import { Service } from 'typedi';
import { CreateRideInput } from '../../infra/api/graphql/input/ride-input';
import { RideRepository } from '../../infra/api/repositores/prisma/ride-repository';

@Service()
export class CreateRideUseCase {
  constructor(
    private readonly rideRepository: RideRepository,
  ) { }

  async execute(data: CreateRideInput): Promise<CreateRideInput> {
    return await this.rideRepository.save(data);
  }
}
