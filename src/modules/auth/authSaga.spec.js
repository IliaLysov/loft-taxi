import {recordSaga} from './recordSaga'
import { authentificateSaga } from './authSaga'
import { authentificate } from './actions'

jest.mock("../../api.js", () => ({
    serverLogin: jest.fn(() => ({success: true, token: 'rechM4ttyHomWbvZR'}))
}))

describe("authSaga", () => {
    describe("#AUTHENTIFICATE", () => {
        it("authentificates through api", async () => {
            const dispatched = await recordSaga(
                authentificateSaga,
                authentificate({email: 'testmail', password: 'testpassword'})
            )
            expect(dispatched).toEqual([
                {
                    type: 'LOG_IN'
                }
            ])
        })
    })
})


// recordSaga(authentificateSaga, authentificate({email: 'test@test.com', password: '123123'}))
