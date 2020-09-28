import { CreateUSerController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'
import { PostgresUsersRepository } from './../../repositories/implementations/PostegresUsersRespository'
import { MailTrapMailProvider } from './../../providers/implementations/MailTrapMailProvider'

const mailtrapMailProvider = new MailTrapMailProvider()
const postgresUsersRepository = new PostgresUsersRepository()

const createUserUseCase = new CreateUserUseCase(
  postgresUsersRepository,
  mailtrapMailProvider
)

const createUserController = new CreateUSerController(
  createUserUseCase
)

export { createUserUseCase, createUserController }
