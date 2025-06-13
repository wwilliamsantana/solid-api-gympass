import { UserRepository } from '@/repositories/user-repository'
import { hash } from 'bcryptjs'
import { UserAlreayExistsError } from './errors/user-already-exists-error'

interface RegisterUserProps {
  name: string
  email: string
  password: string
}

export class RegisterUserCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private userRespository: UserRepository) { }

  async execute({ email, name, password }: RegisterUserProps) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRespository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreayExistsError()
    }

    await this.userRespository.create({
      name,
      email,
      password_hash,
    })
  }
}
