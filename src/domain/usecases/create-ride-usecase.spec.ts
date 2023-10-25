import { RideRepository } from '../../infra/api/repositores/prisma/ride-repository';
import { CreateRideUseCase } from './create-ride-usecase';

jest.mock('../../infra/api/repositores/prisma/ride-repository');
jest.mock('./create-ride-usecase');

describe('CreateRideUseCase', () => {
  const rideRepositoryMock = new RideRepository() as jest.Mocked<RideRepository>;
  const createRideUseCaseMock = new CreateRideUseCase(rideRepositoryMock) as jest.Mocked<CreateRideUseCase>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should create a ride', async () => {
      const data = {
        id: 'UUID',
        user_id: '52e97617-bcf0-4b42-b85a-46c306ece94e',
        name: 'Padal topzera',
        start_date: new Date('2023-09-30'),
        start_date_registration: new Date('2023-09-15'),
        end_date_registration: new Date('2023-09-29'),
        additional_information: 'Pedal vai ser top',
        start_place: 'Praça da Sé',
        participants_limit: 23
      };

      createRideUseCaseMock.execute.mockResolvedValue(data);
      const result = await createRideUseCaseMock.execute(data);

      expect(result).toEqual(data);
    });
  });
});