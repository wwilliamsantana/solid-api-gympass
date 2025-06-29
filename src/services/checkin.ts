import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-in-repository'

interface CheckInUseCaseRequest {
  gymId: string
  userId: string
}

interface CheckInUseCaseResponse {
  checkin: CheckIn
}

export class CheckInUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private checkinRepository: CheckInRepository) { }

  async execute({
    gymId,
    userId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkin = await this.checkinRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkin }
  }
}
