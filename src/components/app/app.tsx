import React, { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { mockEventsData, mockPopularEventIds } from '../../mocks'
import { EventId, AllEventsData } from '../../types'
import { PopularEventsViewer } from '../popular-events-viewer'

export const App = () => {
  const [popularEventsIds, setPopularEventsIds] =
    useState<EventId[]>(mockPopularEventIds)
  const [eventsData, setEventsData] = useState<AllEventsData>(mockEventsData)

  return (
    <BrowserRouter>
      <Route
        exact
        path="/"
        render={() => (
          <PopularEventsViewer
            popularEventIds={popularEventsIds}
            eventsData={eventsData}
            onUpdatePopularEventsIds={(ids) => setPopularEventsIds(ids)}
            onUpdateEventsData={(data) => setEventsData(data)}
          />
        )}
      />
      <Route
        path="/event/:id"
        render={(props) => <h1>{JSON.stringify(props)}</h1>}
      />
    </BrowserRouter>
  )
}
