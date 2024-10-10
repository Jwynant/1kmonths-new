import React from 'react'
import { X, Plus } from 'lucide-react'
import { EventSeasonData } from '../App'

interface WeekPopupProps {
  weekIndex: number
  birthDate: Date
  isDarkMode: boolean
  eventsAndSeasons: EventSeasonData[]
  onClose: () => void
  onAddEvent: (startDate: string) => void
}

const WeekPopup: React.FC<WeekPopupProps> = ({
  weekIndex,
  birthDate,
  isDarkMode,
  eventsAndSeasons,
  onClose,
  onAddEvent,
}) => {
  const weekStartDate = new Date(birthDate.getTime() + weekIndex * 7 * 24 * 60 * 60 * 1000)

  const getAge = () => {
    const years = Math.floor(weekIndex / 52)
    const weeks = weekIndex % 52
    return `Year ${years}, Week ${weeks + 1}`
  }

  const weekItems = eventsAndSeasons.filter((item) => {
    const itemStartDate = new Date(item.startDate)
    const itemEndDate = item.endDate ? new Date(item.endDate) : new Date(itemStartDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    return itemStartDate <= new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000) && itemEndDate >= weekStartDate
  })

  const weekEvents = weekItems.filter(item => item.type === 'event')
  const weekSeasons = weekItems.filter(item => item.type === 'season')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black text-white p-6 rounded-lg shadow-lg w-96 border border-white border-opacity-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Week Details</h2>
          <X className="w-6 h-6 cursor-pointer text-gray-400 hover:text-white transition-colors" onClick={onClose} />
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-base">{getAge()}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Events</h3>
            {weekEvents.length > 0 ? (
              <ul className="space-y-2">
                {weekEvents.map((event, index) => (
                  <li key={index} className="bg-gray-900 rounded p-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: event.color }}></div>
                      <span className="font-medium">{event.title}</span>
                    </div>
                    {event.notes && <p className="text-xs text-gray-400 mt-1">{event.notes}</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">No events for this week.</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Seasons</h3>
            {weekSeasons.length > 0 ? (
              <ul className="space-y-2">
                {weekSeasons.map((season, index) => (
                  <li key={index} className="bg-gray-900 rounded p-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: season.color }}></div>
                      <span className="font-medium">{season.title}</span>
                    </div>
                    {season.notes && <p className="text-xs text-gray-400 mt-1">{season.notes}</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">No seasons for this week.</p>
            )}
          </div>

          <button
            onClick={() => onAddEvent(weekStartDate.toISOString().split('T')[0])}
            className="w-full py-2 px-4 rounded border border-white text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center space-x-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Event</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WeekPopup