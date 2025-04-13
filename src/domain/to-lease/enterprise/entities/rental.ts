import { Entity } from "src/core/entities/entity"
import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import dayjs from "dayjs"

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
        this.calculateTotalRentalTimeAndPrice()
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

    private calculateTotalRentalTimeAndPrice() {
        const start = dayjs(this.props.startTime)   
        const finish = dayjs(this.props.finishTime)

        const hours = Math.ceil(finish.diff(start, 'hour', true))

        const PRICEPERHOUR = 2.00

        this.props.value = hours * PRICEPERHOUR
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