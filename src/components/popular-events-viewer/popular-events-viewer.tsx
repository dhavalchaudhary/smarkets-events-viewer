import React, { useEffect, useState } from 'react'
import {
  isPopularEventDataPresent,
  transformEventAPIResponse
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
  useEffect(() => {
    async function fetchAllData() {
      setLoading(true)
      const popularEventIdsData = await fetchPopularEventsIds('football')
      const allEventsDataPromises = popularEventIdsData.map(fetchEventData)
      const allEventsDataResponse = await Promise.allSettled(
        allEventsDataPromises
      )
      const formattedEventsData = transformEventAPIResponse(
        allEventsDataResponse
      )

      props.onUpdatePopularEventsIds(popularEventIdsData)
      props.onUpdateEventsData(formattedEventsData)
      setLoading(false)
    }

    if (isPopularEventDataPresent(props.popularEventIds, props.eventsData)) {
      fetchAllData()
    }
  }, [])
  return (
    <h1 style={{ fontSize: 100 }}>{loading ? 'Loading' : 'Check console'}</h1>
  )
}
