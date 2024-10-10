import React, { useState, useEffect } from 'react'
import { Settings as SettingsIcon, Plus } from 'lucide-react'
import LifeCalendar from './components/LifeCalendar'
import DatePicker from './components/DatePicker'
import Settings from './components/Settings'
import AddEventSeason from './components/AddEventSeason'
import AddEvent, { EventData } from './components/AddEvent'
import AddSeason, { SeasonData } from './components/AddSeason'
import EventsTimeline from './components/EventsTimeline'
import ShareButton from './components/ShareButton'

export type EventSeasonData = EventData | SeasonData

function App() {
  const [birthDate, setBirthDate] = useState<Date | null>(() => {
    const saved = localStorage.getItem('birthDate')
    if (saved) {
      const date = new Date(saved)
      return isNaN(date.getTime()) ? null : date
    }
    return null
  })
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [yearsToShow, setYearsToShow] = useState(90)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isAddEventSeasonOpen, setIsAddEventSeasonOpen] = useState(false)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [isAddSeasonOpen, setIsAddSeasonOpen] = useState(false)
  const [eventsAndSeasons, setEventsAndSeasons] = useState<EventSeasonData[]>([])
  const [currentView, setCurrentView] = useState<'home' | 'timeline'>('home')
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null)

  useEffect(() => {
    if (birthDate && !isNaN(birthDate.getTime())) {
      localStorage.setItem('birthDate', birthDate.toISOString().split('T')[0])
    }
  }, [birthDate])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)
  const handleYearsChange = (years: number) => setYearsToShow(years)

  const handleSaveEventSeason = (data: EventSeasonData) => {
    setEventsAndSeasons(prev => [...prev, data])
    setIsAddEventOpen(false)
    setIsAddSeasonOpen(false)
    setSelectedStartDate(null)
  }

  const handleAddEvent = () => {
    setIsAddEventSeasonOpen(false)
    setIsAddEventOpen(true)
  }

  const handleAddSeason = () => {
    setIsAddEventSeasonOpen(false)
    setIsAddSeasonOpen(true)
  }

  const handleAddEventSeason = (startDate: string) => {
    setSelectedStartDate(startDate)
    setIsAddEventSeasonOpen(true)
  }

  const handleBirthDateChange = (date: Date) => {
    const newDate = new Date(date.toISOString().split('T')[0] + 'T00:00:00')
    if (!isNaN(newDate.getTime())) {
      setBirthDate(newDate)
    }
  }

  const formatBirthDate = (date: Date) => {
    if (isNaN(date.getTime())) return 'Invalid Date'
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} flex flex-col`}>
      <header className={`p-4 flex items-center border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-2 flex-1">
          {birthDate && (
            <span className="text-sm">Born: {formatBirthDate(birthDate)}</span>
          )}
        </div>
        <div className="flex items-center space-x-4 flex-1 justify-center">
          <button
            className={`px-3 py-1 rounded ${currentView === 'home' ? (isDarkMode ? 'bg-white text-black' : 'bg-black text-white') : (isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300')}`}
            onClick={() => setCurrentView('home')}
          >
            Home
          </button>
          <button
            className={`px-3 py-1 rounded ${currentView === 'timeline' ? (isDarkMode ? 'bg-white text-black' : 'bg-black text-white') : (isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300')}`}
            onClick={() => setCurrentView('timeline')}
          >
            Timeline
          </button>
        </div>
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <ShareButton isDarkMode={isDarkMode} />
          <SettingsIcon 
            className="w-6 h-6 cursor-pointer" 
            onClick={() => setIsSettingsOpen(true)}
          />
        </div>
      </header>
      <main className="flex-grow p-4">
        {!birthDate ? (
          <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Enter your birth date</h2>
            <DatePicker onDateSelect={handleBirthDateChange} isDarkMode={isDarkMode} />
          </div>
        ) : currentView === 'home' ? (
          <LifeCalendar 
            birthDate={birthDate} 
            isDarkMode={isDarkMode} 
            yearsToShow={yearsToShow}
            eventsAndSeasons={eventsAndSeasons}
            onAddEvent={handleAddEventSeason}
          />
        ) : (
          <EventsTimeline
            birthDate={birthDate}
            isDarkMode={isDarkMode}
            eventsAndSeasons={eventsAndSeasons}
            onAddEvent={() => setIsAddEventSeasonOpen(true)}
          />
        )}
      </main>
      {/* Floating Add Button */}
      <button
        onClick={() => setIsAddEventSeasonOpen(true)}
        className={`fixed bottom-6 right-6 p-3 rounded-full ${
          isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
        } shadow-lg z-50 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isDarkMode ? 'focus:ring-white' : 'focus:ring-black'
        }`}
      >
        <Plus className="w-6 h-6" />
      </button>
      {isSettingsOpen && (
        <Settings
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          yearsToShow={yearsToShow}
          onYearsChange={handleYearsChange}
          onClose={() => setIsSettingsOpen(false)}
          birthDate={birthDate}
          onBirthDateChange={handleBirthDateChange}
        />
      )}
      {isAddEventSeasonOpen && (
        <AddEventSeason
          onClose={() => {
            setIsAddEventSeasonOpen(false)
            setSelectedStartDate(null)
          }}
          onAddEvent={handleAddEvent}
          onAddSeason={handleAddSeason}
          isDarkMode={isDarkMode}
        />
      )}
      {isAddEventOpen && (
        <AddEvent
          onClose={() => {
            setIsAddEventOpen(false)
            setSelectedStartDate(null)
          }}
          onSave={handleSaveEventSeason}
          isDarkMode={isDarkMode}
          initialStartDate={selectedStartDate}
        />
      )}
      {isAddSeasonOpen && (
        <AddSeason
          onClose={() => {
            setIsAddSeasonOpen(false)
            setSelectedStartDate(null)
          }}
          onSave={handleSaveEventSeason}
          isDarkMode={isDarkMode}
          initialStartDate={selectedStartDate}
        />
      )}
    </div>
  )
}

export default App