import { CORS_ANYWHERE_URL, EVENT_BASE_URL } from '../../constants/API';
import { mockEventsData } from '../../mocks';
import {fetchEventData} from './fetch-event-data';

const mockId = Object.keys(mockEventsData)[0];

describe("fetchEventData", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('returns the correct result', async () => {
        window.fetch = jest.fn(() => {
            return Promise.resolve({
                json: () => Promise.resolve({events: [mockEventsData[mockId]]})
            })
        }) as jest.Mock
        const res = await fetchEventData(mockId);
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`${CORS_ANYWHERE_URL}/${EVENT_BASE_URL}/${mockId}`)
        expect(res).toStrictEqual(mockEventsData[mockId])
    })
})