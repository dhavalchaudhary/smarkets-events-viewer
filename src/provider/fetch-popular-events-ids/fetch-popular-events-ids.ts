import { CORS_ANYWHERE_URL, POPULAR_EVENTS_BASE_URL } from '../../constants/API'
import { PopularEventsIdsAPIResponse } from '../../types'

export const fetchPopularEventsIds = async (sportType: string = 'football') => {
  const response = await fetch(
    `${CORS_ANYWHERE_URL}/${POPULAR_EVENTS_BASE_URL}/${sportType}`
  )
  const { popular_event_ids }: PopularEventsIdsAPIResponse =
    await response.json()
  return popular_event_ids
}
