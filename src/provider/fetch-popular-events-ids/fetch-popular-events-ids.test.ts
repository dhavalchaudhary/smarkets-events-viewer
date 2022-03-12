import { CORS_ANYWHERE_URL, POPULAR_EVENTS_BASE_URL } from '../../constants'
import { mockPopularEventIds } from '../../mocks'
import { fetchPopularEventsIds } from './fetch-popular-events-ids'

describe('fetchPopularEventsIds', () => {
  it('returns the correct result', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ popular_event_ids: mockPopularEventIds })
      })
    ) as jest.Mock

    const res = await fetchPopularEventsIds('football')
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      `${CORS_ANYWHERE_URL}/${POPULAR_EVENTS_BASE_URL}/football`
    )
    expect(res).toStrictEqual(mockPopularEventIds)
  })
})
