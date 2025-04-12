import { Entity } from "src/core/entities/entity"
import { UniqueEntityId } from "src/core/entities/unique-entity-id"

export interface RentalProps {
    id?: UniqueEntityId
    startTime?: Date
    finishTime?: Date | null
    value?: number | null
    userId: number
    bikeId: number
}

export class Rental extends Entity<RentalProps>{
    get startTime() {
        return this.props.startTime
    }

    get finishTime() {
        return this.props.finishTime!
    }

    set finishTime(newDate: Date) {
        this.props.finishTime = newDate
    }

    get userId() {
        return this.props.userId
    }

    get bikeId() {
        return this.props.bikeId
    }

    get value() {
        return this.props.value!
    }

    set value(value: number) {
        this.props.value = value
    }

    static create(
        props: RentalProps,
        id?: UniqueEntityId
    ) {
        return new Rental({
            startTime: props.startTime ?? new Date(),
            finishTime: props.finishTime ?? new Date(),
            value: props.value,
            userId: props.userId,
            bikeId: props.bikeId
        }, id)
    }
}