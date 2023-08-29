import { CreateRideInput } from '../../api/graphql/input/ride-input';

export interface IRideRepository {
  save(user: CreateRideInput): Promise<CreateRideInput>;
}
