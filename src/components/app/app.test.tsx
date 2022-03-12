import React from 'react'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { App } from './app'
import { MemoryRouter } from 'react-router-dom'
import { fetchEventData } from '../../provider/fetch-event-data'
import {fetchPopularEventsIds} from '../../provider/fetch-popular-events-ids'

jest.mock('../../provider/fetch-event-data', () => ({
  ...jest.requireActual('../../provider/fetch-event-data'),
  fetchEventData: jest.fn()
}))

jest.mock('../../provider/fetch-popular-events-ids', () => ({
  ...jest.requireActual('../../provider/fetch-popular-events-ids'),
  fetchPopularEventsIds: jest.fn()
}))

describe('App', () => {
  it('loads the popular events page by default', async () => {

    (fetchPopularEventsIds as jest.Mock).mockRejectedValue('Error')
    
    render(<MemoryRouter><App /></MemoryRouter>)
    expect(window.location.pathname).toStrictEqual("/")
    expect(screen.getByTestId('popular-events-page')).toBeTruthy()

    await waitForElementToBeRemoved(screen.getByText(/loading/i))
    expect(screen.getByText(/There was an error in getting the data./i)).toBeVisible()
  })
  it('loads the event details if the url is valid', async () => {
    (fetchEventData as jest.Mock).mockRejectedValue('Error')

    render(<MemoryRouter initialEntries={['/event/1']}><App /></MemoryRouter>)
    expect(screen.getByTestId('event-details-page')).toBeTruthy()

    await waitForElementToBeRemoved(screen.getByText(/loading/i))

    expect(screen.getByText(/There was an error in getting the data./i)).toBeVisible()
  })
})
