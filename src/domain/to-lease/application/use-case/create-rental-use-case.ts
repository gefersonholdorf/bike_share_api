import { Either, left, right } from "src/core/errors/either"
import { UserRepository } from "../repositories/user-repository"
import { RentalRepository } from "../repositories/rental-repository"
import { BikeRepository } from "../repositories/bike-repository"

export interface CreateRentalUseCaseRequest {
    userId: number
    bikeId: number
}

export type CreateRentalUseCaseResponse = Either<never, {}>

export class CreateRentalUseCase {
    constructor(
        private readonly rentalRepository: RentalRepository,
        private readonly userRepository: UserRepository,
        private readonly bikeRepository: BikeRepository

    ) {}

    async execute(data: CreateRentalUseCaseRequest): Promise<CreateRentalUseCaseResponse> {

        const {userId, bikeId} = data

        const user = await this.userRepository.findById(userId)

        if(!user) {
            throw new Error()
        }

        const bike = await this.bikeRepository.findById(bikeId)

        if(!bike) {
            throw new Error()
        }

        if(bike.status != 'DISPONÍVEL') {
            throw new Error()
        }

        return right({})
    }
}