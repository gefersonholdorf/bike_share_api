import { Either, left, right } from "src/core/exceptions/either"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { RentalRepository } from "../repositories/rental-repository"
import { UserRepository } from "../repositories/user-repository"
import { UnauthorizedError } from "src/core/exceptions/errors/unauthorized-error"

export interface FinishRentalUseCaseRequest {
    userId: number
    rentalId: number
}

export type FinishRentalUseCaseResponse = Either<ResourceNotFoundError | UnauthorizedError, {
    totalPayable: number
}>

export class FinishRentalUseCase {
    constructor(
        private readonly rentalRepository: RentalRepository,
        private readonly userRepository: UserRepository
    ) {}

    async execute(data: FinishRentalUseCaseRequest): Promise<FinishRentalUseCaseResponse> {
        const {userId, rentalId} = data

        const user = await this.userRepository.findById(userId)

        if(!user) {
            return left(new ResourceNotFoundError())
        }

        const rental = await this.rentalRepository.findById(rentalId)

        if(!rental) {
            return left(new ResourceNotFoundError())
        }

        if(user.id.value !== rental.userId) {
            return left(new UnauthorizedError)
        }

        rental.finishTime = new Date()

        return right({
            totalPayable: rental.value
        })
    }
}