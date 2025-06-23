import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryRepository } from '../repositories/in-memory-repository/in-memory-repository'

import { hash } from 'bcryptjs'
import { GetUserProfileUse } from './get-user-profile'
import { ResourceNotFound } from './errors/resource-not-found'

let userRepository: InMemoryRepository
let sut: GetUserProfileUse

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryRepository()
    sut = new GetUserProfileUse(userRepository)
  })

  it('should be able to get user', async () => {
    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should not be able user with wrong id ', async () => {
    expect(() =>
      sut.execute({
        userId: 'user-not-exists',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
