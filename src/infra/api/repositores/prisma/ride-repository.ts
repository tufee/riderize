import { Service } from 'typedi';
import { IRideRepository } from '../../../interfaces/repositories/ride-repository';
import { CreateRideInput } from '../../graphql/input/ride-input';
import { prisma } from './prisma-client';

@Service()
export class RideRepository implements IRideRepository {

  async save(data: CreateRideInput): Promise<any> {
    return await prisma.ride.create({
      data
    });
  }
}
