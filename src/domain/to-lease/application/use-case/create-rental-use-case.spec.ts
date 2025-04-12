import { describe, expect, it } from "vitest";

describe('Create rental [UNIT]', () => {
    it('should be able to create a rental', async() => {
        const user = {
            id: 1,
            name: 'José Almeida',
            email: 'jose@gmail.com',
            password: 'senha123'
        }

        const bike = {
            id: 1,
            model: 'Caloi',
            status: 'DISPONÍVEL'
        }

        const rental = {
            id: 1,
            userId: user.id,
            bikeId: bike.id,
            startTime: '2025-04-10T10:00:00',
            finishTime: null,
            value: null
        }

        const result = sut.execute(rental)

        expect(result.isRight()).toBe(true)
    })
})