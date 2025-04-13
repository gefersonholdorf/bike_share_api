export class BikeNotAvailableError extends Error{
    constructor() {
        super('Bike not available.')
    }
}