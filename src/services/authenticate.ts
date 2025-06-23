import { UserRepository } from '@/repositories/user-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateUserRequest {
  email: string
  password: string
}

interface AuthenticateUserResponse {
  user: User
}

export class AuthenticateUser {
  // eslint-disable-next-line prettier/prettier
  constructor(private userRespository: UserRepository) { }

  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.userRespository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPassowordMatch = await compare(password, user.password_hash)

    if (!doesPassowordMatch) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
