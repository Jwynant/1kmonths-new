import React, { useState } from 'react'

interface DatePickerProps {
  onDateSelect: (date: Date) => void
  isDarkMode: boolean
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateSelect, isDarkMode }) => {
  const [date, setDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (date) {
      onDateSelect(new Date(date))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={`w-full p-2 border rounded ${
          isDarkMode
            ? 'bg-gray-800 text-white border-gray-700'
            : 'bg-white text-black border-gray-300'
        }`}
        required
      />
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded transition-colors ${
          isDarkMode
            ? 'bg-white text-black hover:bg-gray-200'
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        Start Tracking
      </button>
    </form>
  )
}

export default DatePicker