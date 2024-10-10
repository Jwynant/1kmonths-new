import React from 'react'
import { Plus } from 'lucide-react'
import { EventSeasonData } from './AddEventSeason'

interface EventsTimelineProps {
  birthDate: Date
  isDarkMode: boolean
  eventsAndSeasons: EventSeasonData[]
  onAddEvent: () => void
}

const EventsTimeline: React.FC<EventsTimelineProps> = ({ birthDate, isDarkMode, eventsAndSeasons, onAddEvent }) => {
  const sortedEvents = eventsAndSeasons
    .filter(item => item.type === 'event')
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  const getAge = (date: string) => {
    const eventDate = new Date(date)
    const age = eventDate.getFullYear() - birthDate.getFullYear()
    const monthDiff = eventDate.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && eventDate.getDate() < birthDate.getDate())) {
      return age - 1
    }
    return age
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Timeline</h2>
      <div className={`relative border-l-2 ${isDarkMode ? 'border-white' : 'border-black'} ml-4`}>
        {sortedEvents.length === 0 ? (
          <p className="ml-6 text-gray-500">No events added yet. Click the + button to add your first event!</p>
        ) : (
          sortedEvents.map((event, index) => (
            <div key={index} className="mb-8 flex">
              <div className={`absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 ${event.color}`} style={{ backgroundColor: event.color }}></div>
              <div className="ml-6">
                <p className={`flex flex-wrap gap-4 flex-row items-center justify-start text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="text-sm font-semibold">{getAge(event.startDate)}</span>
                  <span>{new Date(event.startDate).toLocaleDateString()}</span>
                </p>
                <h3 className="text-lg font-semibold mt-1">{event.title}</h3>
                {event.notes && <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{event.notes}</p>}
              </div>
            </div>
          ))
        )}
      </div>
      <button
        onClick={onAddEvent}
        className={`fixed bottom-6 right-6 p-3 rounded-full ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} shadow-lg`}
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}

export default EventsTimeline