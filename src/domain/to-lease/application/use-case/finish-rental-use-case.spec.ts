import { beforeEach, describe, expect, it, vi, Mocked } from "vitest";
import { UserRepository } from "../repositories/user-repository";
import { RentalRepository } from "../repositories/rental-repository";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Rental } from "../../enterprise/entities/rental";
import { User } from "../../enterprise/entities/user";
import { FinishRentalUseCase } from "./finish-rental-use-case";

describe('Create rental [UNIT]', () => {
    let user: User
    let rental: Rental

    let userRepository: Mocked<UserRepository>
    let rentalRepository: Mocked<RentalRepository>

    let sut: FinishRentalUseCase

    beforeEach(() => {
        userRepository = {
            create: vi.fn(),
            findById: vi.fn()
        }

        rentalRepository = {
            create: vi.fn(),
            findById: vi.fn(),
            findRentalActiveByUserId: vi.fn(),
            save: vi.fn()
        }

        sut = new FinishRentalUseCase(rentalRepository, userRepository)
    })

    it('should be able to return the calculated amount after ending the rental', async() => {
        user = User.create({
            name: 'José Almeida',
            email: 'jose@gmail.com',
            password: 'senha123',
            role: 'ADMIN'
        }, new UniqueEntityId(2))

        rental = Rental.create({
            userId: 2,
            bikeId: 1,
            startTime: new Date('2025-04-12T06:00:00'),
            finishTime: null,
            value: null
        }, new UniqueEntityId(1))

        userRepository.findById.mockResolvedValue(user)
        rentalRepository.findById.mockResolvedValue(rental)

        vi.setSystemTime('2025-04-12T07:30:00')

        const result = await sut.execute({
            userId: 2,
            rentalId: 1,
        })

        console.log(result)

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual(expect.objectContaining({
            totalPayable: 4
        }))
    })

    it('should be able to return an error when providing a user that does not belong to the rental', async() => {
        user = User.create({
            name: 'José Almeida',
            email: 'jose@gmail.com',
            password: 'senha123',
            role: 'ADMIN'
        }, new UniqueEntityId(2))

        rental = Rental.create({
            userId: 1,
            bikeId: 1,
            startTime: new Date('2025-04-12T06:00:00'),
            finishTime: null,
            value: null
        }, new UniqueEntityId(1))

        userRepository.findById.mockResolvedValue(user)
        rentalRepository.findById.mockResolvedValue(rental)

        vi.setSystemTime('2025-04-12T07:30:00')

        const result = await sut.execute({
            userId: 2,
            rentalId: 1,
        })

        expect(result.isLeft()).toBe(true)
    })

    it('should be able to return an error when providing a user that does not exist', async() => {
        user = User.create({
            name: 'José Almeida',
            email: 'jose@gmail.com',
            password: 'senha123',
            role: 'ADMIN'
        }, new UniqueEntityId(2))

        rental = Rental.create({
            userId: 1,
            bikeId: 1,
            startTime: new Date('2025-04-12T06:00:00'),
            finishTime: null,
            value: null
        }, new UniqueEntityId(1))

        userRepository.findById.mockResolvedValue(null)
        rentalRepository.findById.mockResolvedValue(rental)

        vi.setSystemTime('2025-04-12T07:30:00')

        const result = await sut.execute({
            userId: 2,
            rentalId: 1,
        })

        expect(result.isLeft()).toBe(true)
    })

    it('should be able to return an error when providing a rental that does not exist', async() => {
        user = User.create({
            name: 'José Almeida',
            email: 'jose@gmail.com',
            password: 'senha123',
            role: 'ADMIN'
        }, new UniqueEntityId(2))

        rental = Rental.create({
            userId: 1,
            bikeId: 1,
            startTime: new Date('2025-04-12T06:00:00'),
            finishTime: null,
            value: null
        }, new UniqueEntityId(1))

        userRepository.findById.mockResolvedValue(user)
        rentalRepository.findById.mockResolvedValue(null)

        vi.setSystemTime('2025-04-12T07:30:00')

        const result = await sut.execute({
            userId: 2,
            rentalId: 1,
        })

        expect(result.isLeft()).toBe(true)
    })
})