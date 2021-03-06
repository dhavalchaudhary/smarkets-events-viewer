import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getEventIdsWithData,
  isAllEventsDataPresent,
  transformMultipleEventsAPIResponse
} from '../../helpers'
import { fetchEventData, fetchPopularEventsIds } from '../../provider'
import { AllEventsData, EventId } from '../../types'
import customStyles from './popular-events-viewer.module.css'
import baseStyles from '../app/app.module.css'

const styles = { ...baseStyles, ...customStyles }

export type PopularEventsViewerProps = {
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
        const popularEventIdsData = await fetchPopularEventsIds()
        const allEventsDataPromises = popularEventIdsData.map((id) =>
          fetchEventData(id)
        )
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

    const arePopularEventsIdsFetched = props.popularEventIds.length > 0
    const arePopularEventsIdsDataFetched =
      arePopularEventsIdsFetched &&
      !isAllEventsDataPresent(props.popularEventIds, props.eventsData)
    if (!arePopularEventsIdsFetched || arePopularEventsIdsDataFetched) {
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
    <div className={styles.pageWrapper} data-testid="popular-events-page">
      {isLoading && <h1 className={styles.loadingTitle}>Loading...</h1>}
      {isError && (
        <h1 className={styles.errorTitle}>
          There was an error in getting the data. Please reload the screen.
        </h1>
      )}
      {isDataValid && (
        <>
          <h1 className={styles.categoryTitle}>Popular Events: Football</h1>
          <div>
            {eventIdsToBeDisplayed.map((id) => (
              <Link to={`/event/${id}`} className={styles.link} key={id}>
                <h2 className={styles.linkTitle}>
                  {props.eventsData[id].name}
                </h2>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
