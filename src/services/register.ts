import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUserProps {
  name: string
  email: string
  password: string
}

export class RegisterUserCase {
  constructor(private userRespository: any) { }

  async execute({ email, name, password }: RegisterUserProps) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: { email },
    })

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
