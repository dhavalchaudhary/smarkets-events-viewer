import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getEventIdsWithData,
  isEventsDataPresent,
  transformMultipleEventsAPIResponse
} from '../../helpers'
import { fetchEventData } from '../../provider/fetch-event-data'
import { fetchPopularEventsIds } from '../../provider/fetch-popular-events-ids'
import { AllEventsData, EventId } from '../../types'

type PopularEventsViewerProps = {
  popularEventIds: EventId[]
  eventsData: AllEventsData
  onUpdatePopularEventsIds: (popularEventIds: EventId[]) => void
  onUpdateEventsData: (eventsData: AllEventsData) => void
}

export const PopularEventsViewer: React.FC<PopularEventsViewerProps> = (
  props
) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    async function fetchAllData() {
      try {
        setLoading(true)
        setError(false)
        const popularEventIdsData = await fetchPopularEventsIds('football')
        const allEventsDataPromises = popularEventIdsData.map(fetchEventData)
        const allEventsDataResponse = await Promise.allSettled(
          allEventsDataPromises
        )
        const formattedEventsData = transformMultipleEventsAPIResponse(
          allEventsDataResponse
        )
        props.onUpdatePopularEventsIds(popularEventIdsData)
        props.onUpdateEventsData(formattedEventsData)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError(true)
      }
    }

    if (isEventsDataPresent(props.popularEventIds, props.eventsData)) {
      fetchAllData()
    }
  
    // eslint-disable-next-line
  }, [])

  const eventIdsToBeDisplayed = getEventIdsWithData(
    props.popularEventIds,
    props.eventsData
  )
  const isLoading = loading && !error
  const isError = !loading && error
  const isDataValid = !loading && !error && eventIdsToBeDisplayed.length
  return (
    <div className="popular-events-page-wrapper">
      {isLoading && <h1 className="title loading-title">Loading...</h1>}
      {isError && (
        <h1 className="title error-title">
          There was an error in getting the data. Please reload the screen.
        </h1>
      )}
      {isDataValid && (
        <>
          <h1 className="popular-events-category-title">Popular Events</h1>
          <div>
            {eventIdsToBeDisplayed.map((id) => (
              <Link to={`/event/${id}`} className="link" key={id}>
                <h2 className="title">{props.eventsData[id].name}</h2>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
