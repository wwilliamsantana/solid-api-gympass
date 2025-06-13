import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-user-repository'
import { hash } from 'bcryptjs'

interface RegisterUserProps {
  name: string
  email: string
  password: string
}

export async function registerUserCase({
  email,
  name,
  password,
}: RegisterUserProps) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: { email },
  })

  if (userWithSameEmail) {
    throw new Error('Email already exists')
  }

  const prismaUserRepository = new PrismaUsersRepository()

  await prismaUserRepository.create({
    name,
    email,
    password_hash,
  })
}
