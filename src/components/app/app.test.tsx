import React from 'react'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { App } from './app'
import { MemoryRouter } from 'react-router-dom'
import { fetchEventData } from '../../provider/fetch-event-data'
import {fetchPopularEventsIds} from '../../provider/fetch-popular-events-ids'
import { mockEventDataAPIResponse, mockPopularEventIds } from '../../mocks'

jest.mock('../../provider/fetch-event-data')
jest.mock('../../provider/fetch-popular-events-ids')


describe('App', () => {
  it('loads the popular events page by default', async () => {

    const mockPopularEventIdsApiResponse = [mockPopularEventIds[0]];
    (fetchPopularEventsIds as jest.Mock).mockResolvedValue(mockPopularEventIdsApiResponse);
    (fetchEventData as jest.Mock).mockResolvedValue(mockEventDataAPIResponse);
    
    
    render(<MemoryRouter><App /></MemoryRouter>)
    expect(window.location.pathname).toStrictEqual("/")
    expect(screen.getByTestId('popular-events-page')).toBeTruthy()

    await waitForElementToBeRemoved(screen.getByText(/loading/i))

    expect(screen.getByText(mockEventDataAPIResponse.name)).toBeVisible()
  })
  it('loads the event details if the url is valid', async () => {
    const mockEventId = mockEventDataAPIResponse.id;
    (fetchEventData as jest.Mock).mockResolvedValue(mockEventDataAPIResponse);

    render(<MemoryRouter initialEntries={[`/event/${mockEventId}`]}><App /></MemoryRouter>)
    expect(screen.getByTestId('event-details-page')).toBeTruthy()

    await waitForElementToBeRemoved(screen.getByText(/loading/i))

    expect(screen.getByText(mockEventDataAPIResponse.name)).toBeVisible()
  })
})
