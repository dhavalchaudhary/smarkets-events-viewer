import { mockEventsData, mockPopularEventIds } from '../../mocks'
import { getEventIdsWithData, isAllEventsDataPresent } from './validation'

describe('Validation Helpers', () => {
  describe('getEventIdsWithData', () => {
    it('returns all event id whose data is fetched', () => {
      const testIds = ['1', '2', '3']
      const mockIds = [...mockPopularEventIds, ...testIds]
      expect(getEventIdsWithData(mockIds, mockEventsData)).toStrictEqual(
        mockPopularEventIds
      )
    })
  })
  describe('isAllEventsDataPresent', () => {
    it('validates if all events data has been fetched', () => {
      const testIds = ['1', '2', '3']
      let mockIds = [...mockPopularEventIds]
      expect(isAllEventsDataPresent(mockIds, mockEventsData)).toBeTruthy()

      mockIds = [...mockPopularEventIds, ...testIds]
      expect(isAllEventsDataPresent(mockIds, mockEventsData)).toBeFalsy()
    })
  })
})
