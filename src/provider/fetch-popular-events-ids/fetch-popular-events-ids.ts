import { PopularEventsIdsAPIResponse } from '../../types'

export const fetchPopularEventsIds = async (sportType: string = 'football') => {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/https://api.smarkets.com/v3/popular/event_ids/sport/${sportType}/`
  )
  const { popular_event_ids }: PopularEventsIdsAPIResponse =
    await response.json()
  return popular_event_ids
}
