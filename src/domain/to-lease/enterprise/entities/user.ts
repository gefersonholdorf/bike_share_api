import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

export type Role = 'ADMIN' | 'COMUM'

export interface UserProps {
    id?: UniqueEntityId
    name: string
    email: string
    password: string
    role?: Role
}

export class User extends Entity<UserProps>{
    get name() {
        return this.props.name
    }

    get email() {
        return this.props.email
    }

    get password() {
        return this.props.password
    }

    get role() {
        return this.props.role
    }

    static create(
        props: UserProps,
        id?: UniqueEntityId
    ) {
        return new User({
            name: props.name,
            email: props.email,
            password: props.password,
            role: props.role ?? 'COMUM'
        }, id)
    }
}