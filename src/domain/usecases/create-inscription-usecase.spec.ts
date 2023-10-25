import { InscriptionInput } from '../../infra/api/graphql/input/inscription-input';
import { Inscription } from '../../infra/api/graphql/type/inscription-type';
import { InscriptionRepository } from '../../infra/api/repositores/prisma/inscription-repository';
import { RideRepository } from '../../infra/api/repositores/prisma/ride-repository';
import { UserRepository } from '../../infra/api/repositores/prisma/user-repository';
import { CreateInscriptionUseCase } from './create-inscription-usecase';

jest.mock('../../infra/api/repositores/prisma/inscription-repository');
jest.mock('../../infra/api/repositores/prisma/ride-repository');
jest.mock('../../infra/api/repositores/prisma/user-repository');

describe('CreateInscriptionUseCase', () => {
  const inscriptionRepositoryMock = new InscriptionRepository() as jest.Mocked<InscriptionRepository>;
  const rideRepositoryMock = new RideRepository() as jest.Mocked<RideRepository>;
  const userRepositoryMock = new UserRepository() as jest.Mocked<UserRepository>;

  const inscriptionRepository = new CreateInscriptionUseCase(
    inscriptionRepositoryMock,
    rideRepositoryMock,
    userRepositoryMock,
  );
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const rideId = 'rideId';
    const userId = 'userId';
    const subscriptionDate = new Date();

    const data: InscriptionInput = {
      ride_id: rideId,
      user_id: userId,
      subscription_date: subscriptionDate
    };

    it('should throw an error if ride is not found', async () => {
      rideRepositoryMock.findById.mockResolvedValueOnce(null);

      await expect(inscriptionRepository.execute(data)).rejects.toThrow(
        'Ride not found',
      );
      expect(rideRepositoryMock.findById).toHaveBeenCalledWith(rideId);
    });

    it('should throw an error if user is not found', async () => {
      rideRepositoryMock.findById.mockResolvedValueOnce({} as any);
      userRepositoryMock.findById.mockResolvedValueOnce(null);

      await expect(inscriptionRepository.execute(data)).rejects.toThrow(
        'User not found',
      );
      expect(userRepositoryMock.findById).toHaveBeenCalledWith(userId);
    });

    it('should throw an error if subscription date is after end date registration', async () => {
      const ride = { end_date_registration: new Date('2022/10/05') };
      rideRepositoryMock.findById.mockResolvedValueOnce(ride as any);

      await expect(inscriptionRepository.execute(data)).rejects.toThrow(
        'Inscriptions has ended',
      );
    });

    it('should save inscription and return it', async () => {
      const ride = { end_date_registration: new Date(Date.now() + 86400000) };
      rideRepositoryMock.findById.mockResolvedValueOnce(ride as any);
      userRepositoryMock.findById.mockResolvedValueOnce({} as any);
      const inscription: Inscription = {
        ride_id: rideId,
        user_id: userId,
        subscription_date: subscriptionDate,
      };
      inscriptionRepositoryMock.save.mockResolvedValueOnce(inscription);

      const result = await inscriptionRepository.execute(data);

      expect(result).toEqual(inscription);
      expect(inscriptionRepositoryMock.save).toHaveBeenCalledWith(data);
    });
  });
});