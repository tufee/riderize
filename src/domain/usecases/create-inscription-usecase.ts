import { Service } from 'typedi';
import { InscriptionInput } from '../../infra/api/graphql/input/inscription-input';
import { Inscription } from '../../infra/api/graphql/type/inscription-type';
import { InscriptionRepository } from '../../infra/api/repositores/prisma/inscription-repository';
import { RideRepository } from '../../infra/api/repositores/prisma/ride-repository';
import { UserRepository } from '../../infra/api/repositores/prisma/user-repository';

@Service()
export class CreateInscriptionUseCase {
  constructor(
    private readonly inscriptionRepository: InscriptionRepository,
    private readonly rideRepository: RideRepository,
    private readonly userRepository: UserRepository,
  ) { }

  async execute(data: InscriptionInput): Promise<Inscription> {
    const ride = await this.rideRepository.findById(data.ride_id);

    if (ride === null) throw new Error('Ride not found');

    if (await this.userRepository.findById(data.user_id) === null) {
      throw new Error('User not found');
    }

    if (new Date(data.subscription_date) > new Date(ride.end_date_registration)) {
      throw new Error('Inscriptions has ended');
    }

    return await this.inscriptionRepository.save(data);
  }
}
