import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { CreateInscriptionUseCase } from '../../../../domain/usecases/create-inscription-usecase';
import logger from '../../../helper/logger';
import { InscriptionRepository } from '../../repositores/prisma/inscription-repository';
import { InscriptionInput } from '../input/inscription-input';
import { Inscription } from '../type/inscription-type';

@Service()
@Resolver()
export class InscriptionResolver {
  constructor(
    private readonly createInscriptionUseCase: CreateInscriptionUseCase,
    private readonly inscriptionRepository: InscriptionRepository
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

  @Query(() => [Inscription], { nullable: true })
  @Authorized()
  async findInscriptionByUserId(@Arg('user_id') user_id: string): Promise<Inscription[] | null> {
    try {
      return await this.inscriptionRepository.findByUserId(user_id);
    } catch (error: any) {
      logger.warn(error);
      throw new Error(error);
    }
  }
}