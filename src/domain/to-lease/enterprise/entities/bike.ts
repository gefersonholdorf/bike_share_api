import { Entity } from "src/core/entities/entity"
import { UniqueEntityId } from "src/core/entities/unique-entity-id"

export type StatusBike = 'DISPONÍVEL' | 'ALUGADA' | 'EM MANUTENÇÃO'

export interface BikeProps {
    id?: UniqueEntityId
    model: string
    status: StatusBike
}

export class Bike extends Entity<BikeProps>{
    get model() {
        return this.props.model
    }

    get status() {
        return this.props.status
    }

    set status(status: StatusBike) {
        this.props.status = status
    }

    static create(
        props: BikeProps,
        id?: UniqueEntityId
    ) {
        return new Bike({
            model: props.model,
            status: props.status
        }, id)
    }
}