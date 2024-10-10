import React, { useState } from 'react'
import { EventSeasonData } from '../App'
import WeekPopup from './WeekPopup'

interface LifeCalendarProps {
  birthDate: Date
  isDarkMode: boolean
  yearsToShow: number
  eventsAndSeasons: EventSeasonData[]
  onAddEvent: (startDate: string) => void
}

const LifeCalendar: React.FC<LifeCalendarProps> = ({ birthDate, isDarkMode, yearsToShow, eventsAndSeasons, onAddEvent }) => {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)
  const weeksInYear = 52
  const weeksInDecade = 520 // Reverted back to 520 weeks per decade
  const totalWeeks = weeksInYear * yearsToShow

  const calculatePassedWeeks = () => {
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - birthDate.getTime())
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
    return Math.min(diffWeeks, totalWeeks)
  }

  const passedWeeks = calculatePassedWeeks()

  const getWeekColor = (weekIndex: number) => {
    const weekDate = new Date(birthDate.getTime() + weekIndex * 7 * 24 * 60 * 60 * 1000)
    let fillColor = isDarkMode ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)'
    let borderColor = isDarkMode ? 'border-white' : 'border-black'
    
    if (weekIndex < passedWeeks) {
      fillColor = isDarkMode ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
    }
    
    for (const item of eventsAndSeasons) {
      const startDate = new Date(item.startDate)
      const endDate = item.type === 'season' && item.endDate ? new Date(item.endDate) : new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000)
      
      if (weekDate >= startDate && weekDate < endDate) {
        if (item.type === 'season') {
          fillColor = item.color
        }
        borderColor = item.color
      }
    }
    
    return { fillColor, borderColor }
  }

  const handleWeekClick = (weekIndex: number) => {
    setSelectedWeek(weekIndex)
  }

  const closePopup = () => {
    setSelectedWeek(null)
  }

  const renderDecade = (decadeIndex: number) => {
    const startWeek = decadeIndex * weeksInDecade
    return (
      <div key={decadeIndex} className="mb-4 flex">
        <div className="w-12 mr-2 text-right">
          {Array.from({ length: 10 }).map((_, yearIndex) => {
            const year = decadeIndex * 10 + yearIndex
            return year % 5 === 0 && year < yearsToShow ? (
              <div key={yearIndex} className="text-xs text-gray-400 h-[14px] leading-[14px]">
                {year}
              </div>
            ) : (
              <div key={yearIndex} className="h-[14px]"></div>
            )
          })}
        </div>
        <div className="flex-grow">
          <div className="grid grid-cols-52 gap-[3px]">
            {Array.from({ length: weeksInDecade }).map((_, index) => {
              const weekIndex = startWeek + index
              if (weekIndex >= totalWeeks) return null
              const { fillColor, borderColor } = getWeekColor(weekIndex)
              return (
                <div
                  key={index}
                  className={`w-[12px] h-[12px] border cursor-pointer transition-colors duration-200 ease-in-out hover:opacity-50`}
                  style={{ 
                    backgroundColor: fillColor,
                    borderColor: borderColor
                  }}
                  onClick={() => handleWeekClick(weekIndex)}
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">My Life</h2>
      <div className="space-y-4">
        {Array.from({ length: Math.ceil(yearsToShow / 10) }).map((_, index) => renderDecade(index))}
      </div>
      <div className="mt-4 text-sm text-gray-400">
        Each square represents one week of your life. {isDarkMode ? 'White' : 'Black'} squares show weeks you've lived.
        Colored squares represent events and seasons.
      </div>
      {selectedWeek !== null && (
        <WeekPopup
          weekIndex={selectedWeek}
          birthDate={birthDate}
          isDarkMode={isDarkMode}
          eventsAndSeasons={eventsAndSeasons}
          onClose={closePopup}
          onAddEvent={onAddEvent}
        />
      )}
    </div>
  )
}

export default LifeCalendar