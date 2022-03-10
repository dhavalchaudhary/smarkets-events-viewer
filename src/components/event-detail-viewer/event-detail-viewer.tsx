import React, { useEffect, useState } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { transformEventAPIResponse } from '../../helpers'
import { fetchEventData } from '../../provider/fetch-event-data'
import { AllEventsData, EventData } from '../../types'

interface EventDetailViewerProps extends RouteComponentProps<{ id: string }> {
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
    <div className="event-details-page-wrapper">
      {isLoading && <h1 className="title loading-title">Loading...</h1>}
      {isError && (
        <h1 className="title error-title">
          There was an error in getting the data. Please reload the screen.
        </h1>
      )}
      {isDataValid && (
        <>
          <Link to="/" className="back-btn-link">
            <h2 className="title">Back</h2>
          </Link>
          <div className="event-details-wrapper">
            <table>
              <tbody>
                <tr>
                  <td className="title first-column">Name</td>
                  <td className="title second-column">{props.data?.name}</td>
                </tr>
                <tr>
                  <td className="title first-column">Type</td>
                  <td className="title second-column">
                    {props.data?.type.replaceAll('_', ' ')}
                  </td>
                </tr>
                <tr>
                  <td className="title first-column">Time</td>
                  <td className="title second-column">
                    {new Date(
                      props.data?.startDateTime as string
                    ).toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="title first-column">Status</td>
                  <td className="title second-column">{props.data?.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
