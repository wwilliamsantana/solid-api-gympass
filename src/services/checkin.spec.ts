import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckIn } from '@/repositories/in-memory-repository/in-memory-checkin'
import { CheckInUseCase } from './checkin'

let checkInRepository: InMemoryCheckIn
let sut: CheckInUseCase

describe('CheckIn Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckIn()
    sut = new CheckInUseCase(checkInRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able create CheckIn ', async () => {
    const { checkin } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkin.id).toEqual(expect.any(String))
  })

  it('should be able to check in twice in the same day ', async () => {
    // vi.setSystemTime(new Date(2021, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
