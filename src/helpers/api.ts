import { AllEventsData, EventDataAPIResponse } from '../types'

export const transformEventAPIResponse = (
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
          [value.id]: {
            name: value.name,
            startDateTime: value.start_datetime,
            status: value.state,
            type: value.type
          }
        }
      } else {
        return obj
      }
    },
    {} as AllEventsData
  )
  return formattedEventsData
}
