import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateUser } from '@/services/factory/make-authenticate-user'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const registerUseCase = makeAuthenticateUser()

    await registerUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
