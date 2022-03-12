import React, { useEffect, useState } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { transformEventAPIResponse } from '../../helpers'
import { fetchEventData } from '../../provider'
import { AllEventsData, EventData } from '../../types'
import customStyles from './event-detail-viewer.module.css'
import baseStyles from '../app/app.module.css'

const styles = { ...baseStyles, ...customStyles }

export interface EventDetailViewerProps
  extends RouteComponentProps<{ id: string }> {
  data: EventData | null
  onUpdateEventData: (eventData: AllEventsData) => void
}

export const EventDetailViewer: React.FC<EventDetailViewerProps> = (props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(false)
        const { id } = props.match.params
        const data = await fetchEventData(id)
        props.onUpdateEventData(transformEventAPIResponse(data))
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError(true)
      }
    }

    if (!props.data) {
      fetchData()
    }

    // eslint-disable-next-line
  }, [])

  const isLoading = loading && !error
  const isError = !loading && error
  const isDataValid = !loading && !error && props.data
  return (
    <div className={styles.pageWrapper} data-testid="event-details-page">
      {isLoading && <h1 className={styles.loadingTitle}>Loading...</h1>}
      {isError && (
        <h1 className={styles.errorTitle}>
          There was an error in getting the data. Please reload the screen.
        </h1>
      )}
      {isDataValid && (
        <>
          <Link to="/" className={styles.backBtnLink}>
            <h2 className={styles.title}>Back</h2>
          </Link>
          <div className={styles.eventDetailsWrapper}>
            <table>
              <tbody>
                <tr>
                  <td className={styles.eventDataTitle}>Name</td>
                  <td className={styles.eventDataValue}>{props.data?.name}</td>
                </tr>
                <tr>
                  <td className={styles.eventDataTitle}>Type</td>
                  <td className={styles.eventDataValue}>
                    {props.data?.type.replaceAll('_', ' ')}
                  </td>
                </tr>
                <tr>
                  <td className={styles.eventDataTitle}>Time</td>
                  <td className={styles.eventDataValue}>
                    {new Date(
                      props.data?.startDateTime as string
                    ).toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className={styles.eventDataTitle}>Status</td>
                  <td className={styles.eventDataValue}>
                    {props.data?.status}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
