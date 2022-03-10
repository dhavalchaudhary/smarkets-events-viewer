interface JSONResponseError {
  errors?: Array<{ message: string }>
}

export interface PopularEventsIdsAPIResponse extends JSONResponseError {
  popular_event_ids: string[]
}

export interface EventDataAPIResponse extends JSONResponseError {
  events: {
    bet_allowed: boolean
    bettable: boolean
    chart_time_period: null
    created: string
    description: null
    display_order: number
    end_date: null
    full_slug: string
    hidden: boolean
    id: string
    inplay_enabled: boolean
    modified: string
    name: string
    parent_id: string
    seo_description: string
    short_name: string
    slug: string
    special_rules: null
    start_date: string
    start_datetime: string
    state: string
    type: string
  }[]
}
