import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface AddEventProps {
  onClose: () => void
  onSave: (data: EventData) => void
  isDarkMode: boolean
  initialStartDate?: string | null
}

export interface EventData {
  type: 'event'
  title: string
  color: string
  startDate: string
  notes?: string
}

const colors = [
  '#E91E63', // Pink
  '#FF5722', // Orange
  '#FFC107', // Yellow
  '#4CAF50', // Green
  '#00BCD4', // Light Blue
  '#2196F3', // Blue
  '#9C27B0'  // Purple
]

const AddEvent: React.FC<AddEventProps> = ({ onClose, onSave, isDarkMode, initialStartDate }) => {
  const [data, setData] = useState<EventData>({
    type: 'event',
    title: '',
    color: colors[0],
    startDate: initialStartDate || '',
    notes: '',
  })

  useEffect(() => {
    if (initialStartDate) {
      setData(prev => ({ ...prev, startDate: initialStartDate }))
    }
  }, [initialStartDate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(data)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black text-white p-6 rounded-lg shadow-lg w-96 border border-white border-opacity-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add Event</h2>
          <X className="w-6 h-6 cursor-pointer text-gray-400 hover:text-white transition-colors" onClick={onClose} />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter title"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Color</label>
            <div className="flex space-x-2">
              {colors.map(color => (
                <div
                  key={color}
                  className={`w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110 ${data.color === color ? 'ring-2 ring-white ring-opacity-60' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setData(prev => ({ ...prev, color }))}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Date</label>
            <input
              type="date"
              name="startDate"
              value={data.startDate}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Notes</label>
            <textarea
              name="notes"
              value={data.notes}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Add your notes here..."
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded text-white hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded text-white border border-white hover:bg-white hover:text-black transition-colors"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEvent