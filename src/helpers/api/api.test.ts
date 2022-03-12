import { mockEventDataAPIResponse, mockEventsData } from '../../mocks'
import { EventDataAPIResponse } from '../../types'
import {
  transformEventAPIResponse,
  transformMultipleEventsAPIResponse
} from './api'

describe('api helpers', () => {
  describe('transformEventAPIResponse', () => {
    it('transorms the response and returns valid data', () => {
      expect(transformEventAPIResponse(mockEventDataAPIResponse)).toStrictEqual(
        {
          [mockEventDataAPIResponse.id]:
            mockEventsData[mockEventDataAPIResponse.id]
        }
      )
    })
  })
  describe('transformMultipleEventsAPIResponse', () => {
    it('transorms the response and returns valid data', () => {
      const mockFulfilledPromise: PromiseFulfilledResult<
        EventDataAPIResponse['events'][0]
      > = { status: 'fulfilled', value: mockEventDataAPIResponse }
      const mockRejectedPromise: PromiseRejectedResult = {
        status: 'rejected',
        reason: 'error'
      }

      const expectedObj = {
        [mockEventDataAPIResponse.id]:
          mockEventsData[mockEventDataAPIResponse.id]
      }

      expect(
        transformMultipleEventsAPIResponse([
          mockFulfilledPromise,
          mockRejectedPromise
        ])
      ).toStrictEqual(expectedObj)
    })
  })
})
