import { Rental } from "../../enterprise/entities/rental";

export abstract class RentalRepository {
    abstract create(rental: Rental): Promise<void>
    abstract findById(id: number): Promise<Rental | null>
    abstract findRentalActiveByUserId(userId: number): Promise<Rental | null>
    abstract save(rental: Rental, id: number): Promise<void>
}