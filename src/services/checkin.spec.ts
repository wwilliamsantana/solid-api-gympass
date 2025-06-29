import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCheckIn } from '@/repositories/in-memory-repository/in-memory-checkin'
import { CheckInUseCase } from './checkin'

let checkInRepository: InMemoryCheckIn
let sut: CheckInUseCase

describe('CheckIn Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckIn()
    sut = new CheckInUseCase(checkInRepository)
  })

  it('should be able create CheckIn ', async () => {
    const { checkin } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkin.id).toEqual(expect.any(String))
  })
})
