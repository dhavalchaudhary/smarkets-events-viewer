import React from 'react'
import { EventDetailViewer } from './event-detail-viewer'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import { mockEventDataAPIResponse, mockEventsData, mockPopularEventIds } from '../../mocks';
import { MemoryRouter } from 'react-router-dom';
import { EventData } from '../../types';
import {fetchEventData} from '../../provider/fetch-event-data';
import { transformEventAPIResponse } from '../../helpers';

jest.mock("../../provider/fetch-event-data")

const mockEventId = mockPopularEventIds[0];

const mockRouteComponentProps = {
  history: {} as any,
  location: {} as any,
  match: {params: {id: mockEventId}} as any,
}

describe('EventDetailViewer', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('displays the data when present', () => {
    const mockProps = {
      ...mockRouteComponentProps,
      data: mockEventsData[mockEventId] as EventData,
      onUpdateEventData: jest.fn()
    }

    render(<MemoryRouter initialEntries={[`/event/${mockEventId}`]}><EventDetailViewer {...mockProps} /></MemoryRouter>)

    const expectedDateTimeString = new Date(mockProps.data.startDateTime).toLocaleString()
    const expectedTypeString = mockProps.data.type.replaceAll("_"," ")

    expect(screen.getByText(mockProps.data.name)).toBeVisible()
    expect(screen.getByText(mockProps.data.status)).toBeVisible()
    expect(screen.getByText(expectedTypeString)).toBeVisible()
    expect(screen.getByText(expectedDateTimeString)).toBeVisible()
  })
  it('fetches the data when not present and updates global state', async () => {
    const mockProps = {
      ...mockRouteComponentProps,
      data: null,
      onUpdateEventData: jest.fn()
    };

    (fetchEventData as jest.Mock).mockResolvedValue(mockEventDataAPIResponse)

    render(<MemoryRouter initialEntries={[`/event/${mockEventId}`]}><EventDetailViewer {...mockProps} /></MemoryRouter>)

    await waitForElementToBeRemoved(screen.getByText(/loading/i))

    expect(fetchEventData).toHaveBeenCalledTimes(1)
    expect(mockProps.onUpdateEventData).toHaveBeenCalledTimes(1)
    expect(mockProps.onUpdateEventData).toHaveBeenCalledWith(transformEventAPIResponse(mockEventDataAPIResponse))
  })
  it('shows the error message when the api call is unsuccesful', async () => {
    const mockProps = {
      ...mockRouteComponentProps,
      data: null,
      onUpdateEventData: jest.fn()
    };

    (fetchEventData as jest.Mock).mockRejectedValue("Error")

    render(<MemoryRouter initialEntries={[`/event/${mockEventId}`]}><EventDetailViewer {...mockProps} /></MemoryRouter>)

    await waitForElementToBeRemoved(screen.getByText(/loading/i))

    expect(screen.getByText(/There was an error in getting the data./i)).toBeVisible()
  })
})
