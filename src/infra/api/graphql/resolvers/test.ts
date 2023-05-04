import { Query, Resolver } from 'type-graphql';

@Resolver()
export class TestResolver {
  @Query(() => String)
  async helloWorld() {
    return 'Hello World!';
  }
}

