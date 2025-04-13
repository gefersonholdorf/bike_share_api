import { Either, left, right } from "src/core/exceptions/either"
import { UserRepository } from "../repositories/user-repository"
import { RentalRepository } from "../repositories/rental-repository"
import { BikeRepository } from "../repositories/bike-repository"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { Rental } from "../../enterprise/entities/rental"
import { BikeNotAvailableError } from "src/core/exceptions/errors/bike-not-available-error"
import { ActiveLeaseError } from "src/core/exceptions/errors/active-lease-error"

export interface CreateRentalUseCaseRequest {
    userId: number
    bikeId: number
}

export type CreateRentalUseCaseResponse = Either<ResourceNotFoundError | BikeNotAvailableError | ActiveLeaseError, {}>

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
            return left(new ResourceNotFoundError())
        }

        const bike = await this.bikeRepository.findById(bikeId)

        if(!bike) {
            return left(new ResourceNotFoundError())
        }

        const rental = await this.rentalRepository.findRentalActiveByUserId(userId)

        if(rental) {
            return left(new ActiveLeaseError())
        }

        if(bike.status != 'DISPONÍVEL') {
            return left(new BikeNotAvailableError())
        }

        const newRental = Rental.create({
            userId, bikeId
        })

        await this.rentalRepository.create(newRental)

        return right({})
    }
}