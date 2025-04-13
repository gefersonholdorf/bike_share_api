import { beforeEach, describe, expect, it, vi, Mocked } from "vitest";
import { CreateRentalUseCase } from "./create-rental-use-case";
import { UserRepository } from "../repositories/user-repository";
import { BikeRepository } from "../repositories/bike-repository";
import { RentalRepository } from "../repositories/rental-repository";
import { Bike } from "../../enterprise/entities/bike";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Rental } from "../../enterprise/entities/rental";
import { User } from "../../enterprise/entities/user";

describe('Create rental [UNIT]', () => {
    let bike: Bike
    let user: User
    let rental: Rental
    
    let userRepository: Mocked<UserRepository>
    let bikeRepository: Mocked<BikeRepository>
    let rentalRepository: Mocked<RentalRepository>

    let sut: CreateRentalUseCase

    beforeEach(() => {
        userRepository = {
            create: vi.fn(),
            findById: vi.fn()
        }

        bikeRepository = {
            create: vi.fn(),
            findById: vi.fn()
        }

        rentalRepository = {
            create: vi.fn(),
            findById: vi.fn(),
            findRentalActiveByUserId: vi.fn(),
            save: vi.fn()
        }

        sut = new CreateRentalUseCase(rentalRepository, userRepository, bikeRepository)
    })

    it('should be able to create a rental when the user has no active rental and the bike is available', async() => {
        bike = Bike.create({
            model: 'Caloi',
            status: 'DISPONÍVEL'
        }, new UniqueEntityId(1))

        user = User.create({
            name: 'José Almeida',
            email: 'jose@gmail.com',
            password: 'senha123',
            role: 'ADMIN'
        })

        userRepository.findById.mockResolvedValue(user)
        bikeRepository.findById.mockResolvedValue(bike)
        rentalRepository.findRentalActiveByUserId.mockResolvedValue(null)

        const result = await sut.execute({
            userId: 1,
            bikeId: 1,
        })

        expect(result.isRight()).toBe(true)
    })

    it('should be able to throw an error when the user has an active rental', async() => {
        bike = Bike.create({
            model: 'Caloi',
            status: 'DISPONÍVEL'
        }, new UniqueEntityId(1))

        user = User.create({
            name: 'José Almeida',
            email: 'jose@gmail.com',
            password: 'senha123',
            role: 'ADMIN'
        }, new UniqueEntityId(1))

        rental = Rental.create({
            userId: 1,
            bikeId: 1,
            startTime: new Date('2025-04-12T06:00:00'),
            finishTime: null,
            value: null
        }, new UniqueEntityId(1))

        userRepository.findById.mockResolvedValue(user)
        bikeRepository.findById.mockResolvedValue(bike)
        rentalRepository.findRentalActiveByUserId.mockResolvedValue(rental)

        const result = await sut.execute({
            userId: 1,
            bikeId: 1,
        })

        expect(result.isLeft()).toBe(true)
    })

    it('should be able to throw an error when the bike has a status other than available', async() => {
        bike = Bike.create({
            model: 'Caloi',
            status: 'ALUGADA'
        }, new UniqueEntityId(1))

        user = User.create({
            name: 'José Almeida',
            email: 'jose@gmail.com',
            password: 'senha123',
            role: 'ADMIN'
        }, new UniqueEntityId(1))

        rental = Rental.create({
            userId: 1,
            bikeId: 1,
            startTime: new Date('2025-04-12T06:00:00'),
            finishTime: null,
            value: null
        }, new UniqueEntityId(1))

        userRepository.findById.mockResolvedValue(user)
        bikeRepository.findById.mockResolvedValue(bike)
        rentalRepository.findRentalActiveByUserId.mockResolvedValue(null)

        const result = await sut.execute({
            userId: 1,
            bikeId: 1,
        })

        expect(result.isLeft()).toBe(true)
    })
})