import { Service } from 'typedi';
import { IInscriptionRepository } from '../../../interfaces/repositories/inscription-repository';
import { InscriptionInput } from '../../graphql/input/inscription-input';
import { Inscription } from '../../graphql/type/inscription-type';
import { prisma } from './prisma-client';

@Service()
export class InscriptionRepository implements IInscriptionRepository {

  async save(data: InscriptionInput): Promise<Inscription> {
    return await prisma.inscription.create({ data });
  }

  async findByUserId(user_id: string): Promise<Inscription[] | null> {
    return await prisma.inscription.findMany({
      where: {
        user_id,
      },
    });
  }
}
