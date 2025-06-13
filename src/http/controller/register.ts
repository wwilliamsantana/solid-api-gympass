import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'
import { RegisterUserCase } from '@/services/register'
import { PrismaUsersRepository } from '@/repositories/prisma-user-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = userSchema.parse(request.body)

  try {
    const userRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUserCase(userRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
