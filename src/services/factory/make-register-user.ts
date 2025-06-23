import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'

import { RegisterUseCase } from '../register'

export function makeRegisterUser() {
  const userRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(userRepository)

  return registerUseCase
}
