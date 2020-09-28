import { IMailProvider } from './../../providers/IMailProvider'
import { User } from './../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateUserRequestDTO } from './CreateUserDTO'

export class CreateUserUseCase {
  constructor (
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute (data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new Error('Usuário já existente')
    }

    const user = new User(data)

    await this.usersRepository.save(user)

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'Equipe Code Dreams',
        email: 'eduardo@acodedreams.com.br'
      },
      subject: 'Seja bem-vindo a plataforma',
      body: '<h1>Hello World!<h1>'
    })
  }
}
