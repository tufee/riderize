import { Service } from 'typedi';
import { IRideRepository } from '../../../interfaces/repositories/ride-repository';
import { CreateRideInput } from '../../graphql/input/ride-input';
import { prisma } from './prisma-client';

@Service()
export class RideRepository implements IRideRepository {

  async save(ride: CreateRideInput): Promise<any> {
    return await prisma.ride.create({
      data: {
        user_id: ride.user_id,
        name: ride.name,
        start_date: ride.start_date,
        start_date_registration: ride.start_date_registration,
        end_date_registration: ride.end_date_registration,
        additional_information: ride.additional_information,
        start_place: ride.start_place,
        participants_limit: ride.participants_limit
      }
    });
  }
}
