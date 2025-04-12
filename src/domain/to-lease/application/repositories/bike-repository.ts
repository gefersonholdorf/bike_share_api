import { Bike } from "../../enterprise/entities/bike";

export abstract class BikeRepository {
    abstract create(bike: Bike): Promise<void>
    abstract findById(id: number): Promise<Bike | null>
}