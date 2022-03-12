import { AllEventsData, EventId } from '../types'

export const mockPopularEventIds: EventId[] = [
  '42636774',
  '42636763',
  '42637348',
  '42636761',
  '42640833'
]

export const mockEventsData: AllEventsData = {
  '42636761': {
    name: 'Wolverhampton Wanderers vs Watford',
    startDateTime: '2022-03-10T19:30:00Z',
    status: 'upcoming',
    type: 'football_match'
  },
  '42636763': {
    name: 'Southampton vs Newcastle United',
    startDateTime: '2022-03-10T19:30:00Z',
    status: 'upcoming',
    type: 'football_match'
  },
  '42636774': {
    name: 'Porto vs. Liverpool',
    startDateTime: '2019-04-17T19:00:00Z',
    status: 'ended',
    type: 'football_match'
  },
  '42637348': {
    name: 'Norwich City vs Chelsea',
    startDateTime: '2022-03-10T19:30:00Z',
    status: 'upcoming',
    type: 'football_match'
  },
  '42640833': {
    name: 'Bodø/Glimt vs AZ Alkmaar',
    startDateTime: '2022-03-10T20:00:00Z',
    status: 'upcoming',
    type: 'football_match'
  }
}
