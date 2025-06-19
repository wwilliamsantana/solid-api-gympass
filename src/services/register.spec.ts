import { describe, expect, it } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'

import { UserAlreayExistsError } from './errors/user-already-exists-error'
import { InMemoryRepository } from '../repositories/in-memory-repository/in-memory-repository'

describe('Register Use Case', () => {
  it('should hash user password uppon registration', async () => {
    const useRepository = new InMemoryRepository()
    const registerUserCase = new RegisterUserCase(useRepository)

    const { user } = await registerUserCase.execute({
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
    const useRepository = new InMemoryRepository()
    const registerUserCase = new RegisterUserCase(useRepository)

    await registerUserCase.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    })

    expect(() =>
      registerUserCase.execute({
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreayExistsError)
  })
})
