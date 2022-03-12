import React from 'react'
import {  cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { mockEventsData, mockPopularEventIds, mockEventDataAPIResponse } from '../../mocks'
import { PopularEventsViewer, PopularEventsViewerProps } from './popular-events-viewer'
import {MemoryRouter} from 'react-router-dom'
import {fetchEventData} from '../../provider/fetch-event-data';
import {fetchPopularEventsIds} from '../../provider/fetch-popular-events-ids'
import { transformEventAPIResponse } from '../../helpers'

jest.mock("../../provider/fetch-event-data", () => ({
  ...jest.requireActual("../../provider/fetch-event-data"),
  fetchEventData: jest.fn()
}))

jest.mock("../../provider/fetch-popular-events-ids", () => ({
  ...jest.requireActual("../../provider/fetch-popular-events-ids"),
  fetchPopularEventsIds: jest.fn()
}))


const mockEventId = mockPopularEventIds[0];
    const mockBaseProps: PopularEventsViewerProps = {
      popularEventIds: [mockEventId],
      eventsData: {[mockEventId]: mockEventsData[mockEventId]},
      onUpdatePopularEventsIds: jest.fn(),
      onUpdateEventsData: jest.fn()
    }

describe('PopularEventsViewer', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup()
  })
  it('displays the data when present', () => {

    render(<MemoryRouter ><PopularEventsViewer {...mockBaseProps} /></MemoryRouter>)

    expect(screen.getByText(mockBaseProps.eventsData[mockEventId].name)).toBeVisible()
  })
  it('fetches the data when not present and updates global state', async () => {
    const mockPopularEventIdsApiResponse = [mockPopularEventIds[0]]
    const mockProps: PopularEventsViewerProps = {
      ...mockBaseProps,
      popularEventIds: [],
      eventsData: {},
    };
    (fetchPopularEventsIds as jest.Mock).mockResolvedValue(mockPopularEventIdsApiResponse);
    (fetchEventData as jest.Mock).mockResolvedValue(mockEventDataAPIResponse);
    
    render(<MemoryRouter ><PopularEventsViewer {...mockProps} /></MemoryRouter>)

    await waitForElementToBeRemoved(screen.getByText(/loading/i))

    expect(fetchPopularEventsIds).toHaveBeenCalledTimes(1)
    expect(fetchEventData).toHaveBeenCalledTimes(mockPopularEventIdsApiResponse.length)
    expect(fetchEventData).toHaveBeenLastCalledWith(mockPopularEventIdsApiResponse[mockPopularEventIdsApiResponse.length - 1]);

    expect(mockProps.onUpdatePopularEventsIds).toHaveBeenCalledTimes(1)
    expect(mockProps.onUpdatePopularEventsIds).toHaveBeenCalledWith(mockPopularEventIdsApiResponse)
    expect(mockProps.onUpdateEventsData).toHaveBeenCalledTimes(1)
    expect(mockProps.onUpdateEventsData).toHaveBeenCalledWith(transformEventAPIResponse(mockEventDataAPIResponse))
  })
  it('shows the error message when the api call is unsuccesful', async () => {
    const mockProps: PopularEventsViewerProps = {
      ...mockBaseProps,
      popularEventIds: [],
      eventsData: {},
    };
    
    (fetchPopularEventsIds as jest.Mock).mockRejectedValue("Error");

    render(<MemoryRouter ><PopularEventsViewer {...mockProps} /></MemoryRouter>)
    
    await waitForElementToBeRemoved(screen.getByText(/loading/i))
    expect(screen.getByText(/there was an error in getting the data/i)).toBeVisible()
  })
})
