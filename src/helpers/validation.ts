import { AllEventsData, EventId } from '../types'

export const isPopularEventDataPresent = (
  popularEventIds: EventId[],
  eventsData: AllEventsData
) => {
  if (popularEventIds.length === 0) {
    return true
  }
  return (
    popularEventIds.filter((id) => eventsData.hasOwnProperty(id)).length === 0
  )
}
