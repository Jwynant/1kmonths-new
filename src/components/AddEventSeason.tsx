import React from 'react'
import { X } from 'lucide-react'

interface AddEventSeasonProps {
  onClose: () => void
  onAddEvent: () => void
  onAddSeason: () => void
  isDarkMode: boolean
}

const AddEventSeason: React.FC<AddEventSeasonProps> = ({ onClose, onAddEvent, onAddSeason, isDarkMode }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black text-white p-6 rounded-lg shadow-lg w-80 border border-white border-opacity-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add to Your Timeline</h2>
          <X className="w-6 h-6 cursor-pointer text-gray-400 hover:text-white transition-colors" onClick={onClose} />
        </div>
        <div className="space-y-4">
          <button
            onClick={onAddEvent}
            className="w-full py-3 px-4 rounded text-white border border-white hover:bg-white hover:text-black transition-colors"
          >
            Add Event
          </button>
          <button
            onClick={onAddSeason}
            className="w-full py-3 px-4 rounded text-white border border-white hover:bg-white hover:text-black transition-colors"
          >
            Add Season
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddEventSeason