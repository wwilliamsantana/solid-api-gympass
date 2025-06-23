import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryRepository } from '../repositories/in-memory-repository/in-memory-repository'
import { AuthenticateUser } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let userRepository: InMemoryRepository
let sut: AuthenticateUser

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryRepository()
    sut = new AuthenticateUser(userRepository)
  })

  it('should be able authenticate user', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able authenticate email ', async () => {
    expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able authenticate password ', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
