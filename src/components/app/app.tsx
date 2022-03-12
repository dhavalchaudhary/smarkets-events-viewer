import React, { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { EventId, AllEventsData } from '../../types'
import { EventDetailViewer } from '../event-detail-viewer'
import { PopularEventsViewer } from '../popular-events-viewer'

export const App = () => {
  const [popularEventsIds, setPopularEventsIds] = useState<EventId[]>([])
  const [eventsData, setEventsData] = useState<AllEventsData>({})
  return (
    <>
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
        render={(props) => {
          const eventId = props.match.params.id
          const data = eventsData.hasOwnProperty(eventId)
            ? eventsData[eventId]
            : null
          return (
            <EventDetailViewer
              data={data}
              onUpdateEventData={(data) => setEventsData(data)}
              {...props}
            />
          )
        }}
      />
    </>
  )
}
