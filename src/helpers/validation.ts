import { AllEventsData, EventId } from '../types'

export const getEventIdsWithData = (
  popularEventIds: EventId[],
  eventsData: AllEventsData
) => {
  return popularEventIds.filter((id) => eventsData.hasOwnProperty(id))
}

export const isEventsDataPresent = (
  eventIds: EventId[],
  eventsData: AllEventsData
) => {
  return getEventIdsWithData(eventIds, eventsData).length === 0
}
