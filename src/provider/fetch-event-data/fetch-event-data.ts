import { CORS_ANYWHERE_URL, EVENT_BASE_URL } from '../../constants'
import { EventDataAPIResponse, EventId } from '../../types'

export const fetchEventData = async (id: EventId) => {
  const response = await fetch(`${CORS_ANYWHERE_URL}/${EVENT_BASE_URL}/${id}`)
  const { events }: EventDataAPIResponse = await response.json()
  return events[0]
}
