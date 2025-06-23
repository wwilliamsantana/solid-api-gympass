import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { AuthenticateUser } from '../authenticate'

export function makeAuthenticateUser() {
  const userRepository = new PrismaUsersRepository()
  const registerUseCase = new AuthenticateUser(userRepository)

  return registerUseCase
}
