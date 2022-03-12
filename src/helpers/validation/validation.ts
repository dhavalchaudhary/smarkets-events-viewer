import { AllEventsData, EventId } from '../../types'

export const getEventIdsWithData = (
  popularEventIds: EventId[],
  eventsData: AllEventsData
) => {
  return popularEventIds.filter((id) => eventsData.hasOwnProperty(id))
}

export const isAllEventsDataPresent = (
  eventIds: EventId[],
  eventsData: AllEventsData
) => {
  return getEventIdsWithData(eventIds, eventsData).length === eventIds.length
}
