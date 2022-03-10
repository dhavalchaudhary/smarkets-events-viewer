import { AllEventsData, EventId } from '../types'

export const getEventIdsWithData = (
  popularEventIds: EventId[],
  eventsData: AllEventsData
) => {
  return popularEventIds.filter((id) => eventsData.hasOwnProperty(id))
}

export const isPopularEventDataPresent = (
  popularEventIds: EventId[],
  eventsData: AllEventsData
) => {
  if (popularEventIds.length === 0) {
    return true
  }
  return getEventIdsWithData(popularEventIds, eventsData).length === 0
}
