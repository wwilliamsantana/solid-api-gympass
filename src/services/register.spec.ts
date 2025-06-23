import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'

import { UserAlreayExistsError } from './errors/user-already-exists-error'
import { InMemoryRepository } from '../repositories/in-memory-repository/in-memory-repository'

let userRepository: InMemoryRepository
let sut: RegisterUserCase

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryRepository()
    sut = new RegisterUserCase(userRepository)
  })

  it('should be able create user', async () => {
    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password uppon registration', async () => {
    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreayExistsError)
  })
})
