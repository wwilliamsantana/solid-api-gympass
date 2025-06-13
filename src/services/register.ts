import { UserRepository } from '@/repositories/user-repository'
import { hash } from 'bcryptjs'

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
      throw new Error('Email already exists')
    }

    await this.userRespository.create({
      name,
      email,
      password_hash,
    })
  }
}
