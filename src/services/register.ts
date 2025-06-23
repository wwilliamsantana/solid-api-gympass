import { UserRepository } from '@/repositories/user-repository'
import { hash } from 'bcryptjs'
import { UserAlreayExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUserRequest {
  name: string
  email: string
  password: string
}

interface RegisterUserResponse {
  user: User
}

export class RegisterUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private userRespository: UserRepository) { }

  async execute({
    email,
    name,
    password,
  }: RegisterUserRequest): Promise<RegisterUserResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRespository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreayExistsError()
    }

    const user = await this.userRespository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
