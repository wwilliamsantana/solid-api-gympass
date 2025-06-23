import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'

import { RegisterUserCase } from '../register'

export function makeRegisterUser() {
  const userRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUserCase(userRepository)

  return registerUseCase
}
