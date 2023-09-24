import { Service } from 'typedi';
import { InscriptionInput } from '../../infra/api/graphql/input/inscription-input';
import { Inscription } from '../../infra/api/graphql/type/inscription-type';
import { InscriptionRepository } from '../../infra/api/repositores/prisma/inscription-repository';

@Service()
export class CreateInscriptionUseCase {
  constructor(
    private readonly inscriptionRepository: InscriptionRepository,
  ) { }

  async execute(data: InscriptionInput): Promise<Inscription> {
    return await this.inscriptionRepository.save(data);
  }
}
