import { EventDataAPIResponse, EventId } from '../../types'

export const fetchEventData = async (id: EventId) => {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/https://api.smarkets.com/v3/events/${id}`
  )
  const { events }: EventDataAPIResponse = await response.json()
  return events[0]
}
