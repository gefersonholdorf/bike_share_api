export class ActiveLeaseError extends Error {
    constructor() {
        super('The user already has an active lease.')
    }
}