import { AllEventsData, EventDataAPIResponse } from '../../types'

export const transformEventAPIResponse = (
  apiResponse: EventDataAPIResponse['events'][0]
): AllEventsData => ({
  [apiResponse.id]: {
    name: apiResponse.name,
    startDateTime: apiResponse.start_datetime,
    status: apiResponse.state,
    type: apiResponse.type
  }
})
export const transformMultipleEventsAPIResponse = (
  allEventsPromiseResponses: PromiseSettledResult<
    EventDataAPIResponse['events'][0]
  >[]
) => {
  const formattedEventsData = allEventsPromiseResponses.reduce(
    (obj, apiResponse) => {
      if (apiResponse.status === 'fulfilled') {
        const { value } = apiResponse
        return {
          ...obj,
          ...transformEventAPIResponse(value)
        }
      } else {
        return obj
      }
    },
    {} as AllEventsData
  )
  return formattedEventsData
}
