export type EventData = {
  name: string
  startDateTime: string
  status: string
  type: string
}

export type EventId = string

export type AllEventsData = { [id: EventId]: EventData }
