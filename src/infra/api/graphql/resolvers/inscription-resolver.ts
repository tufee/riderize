import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { CreateInscriptionUseCase } from '../../../../domain/usecases/create-inscription-usecase';
import logger from '../../../helper/logger';
import { InscriptionInput } from '../input/inscription-input';
import { Inscription } from '../type/inscription-type';

@Service()
@Resolver()
export class InscriptionResolver {
  constructor(
    private readonly createInscriptionUseCase: CreateInscriptionUseCase
  ) { }

  @Mutation(() => Inscription)
  @Authorized()
  async createInscription(@Arg('data') data: InscriptionInput): Promise<Inscription> {
    try {
      return await this.createInscriptionUseCase.execute(data);
    } catch (error: any) {
      logger.warn(error);
      throw new Error(error);
    }
  }
}

