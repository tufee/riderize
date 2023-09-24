import { InscriptionInput } from '../../api/graphql/input/inscription-input';
import { Inscription } from '../../api/graphql/type/inscription-type';

export interface IInscriptionRepository {
  save(inscription: InscriptionInput): Promise<Inscription>;
}
