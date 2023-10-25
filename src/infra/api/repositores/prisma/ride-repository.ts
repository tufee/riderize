import { Service } from 'typedi';
import { IRideRepository } from '../../../interfaces/repositories/ride-repository';
import { CreateRideInput } from '../../graphql/input/ride-input';
import { Ride } from '../../graphql/type/ride-type';
import { prisma } from './prisma-client';

@Service()
export class RideRepository implements IRideRepository {

  async save(data: CreateRideInput): Promise<Omit<Ride, 'id'>> {
    const { additional_information, ...rest } = data;
    return await prisma.ride.create({
      data: {
        ...rest,
        additional_information: additional_information || undefined
      }
    }) as CreateRideInput;
  }

  async findByUserId(user_id: string): Promise<Ride[] | null> {
    const rides = await prisma.ride.findMany({
      where: {
        user_id
      }
    });

    if (!rides) {
      return null;
    }

    return rides.map((ride) => ({
      ...ride,
      additional_information: ride.additional_information || undefined,
      participants_limit: ride.participants_limit || undefined
    }));
  }

  async findAll(): Promise<Ride[] | null> {
    const rides = await prisma.ride.findMany();

    if (!rides) {
      return null;
    }

    return rides.map((ride) => ({
      ...ride,
      additional_information: ride.additional_information || undefined,
      participants_limit: ride.participants_limit || undefined
    }));
  }

  async findById(id: string): Promise<Ride | null> {
    const ride = await prisma.ride.findFirst({
      where: {
        id
      }
    });

    if (!ride) {
      return null;
    }

    return {
      ...ride,
      additional_information: ride.additional_information || undefined,
      participants_limit: ride.participants_limit || undefined
    };
  }
}
