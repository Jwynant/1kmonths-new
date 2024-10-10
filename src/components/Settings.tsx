import React from 'react'
import { X } from 'lucide-react'

interface SettingsProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
  yearsToShow: number
  onYearsChange: (years: number) => void
  onClose: () => void
  birthDate: Date | null
  onBirthDateChange: (date: Date) => void
}

const Settings: React.FC<SettingsProps> = ({
  isDarkMode,
  toggleDarkMode,
  yearsToShow,
  onYearsChange,
  onClose,
  birthDate,
  onBirthDateChange,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black text-white p-6 rounded-lg shadow-lg w-80 border border-white border-opacity-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Settings</h2>
          <X className="w-6 h-6 cursor-pointer text-gray-400 hover:text-white transition-colors" onClick={onClose} />
        </div>
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Dark Mode</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label htmlFor="yearsToShow" className="block mb-2 text-sm font-medium text-gray-300">
              Years to Show
            </label>
            <input
              type="number"
              id="yearsToShow"
              min="10"
              max="100"
              step="10"
              value={yearsToShow}
              onChange={(e) => onYearsChange(Number(e.target.value))}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="birthDate" className="block mb-2 text-sm font-medium text-gray-300">
              Birth Date
            </label>
            <input
              type="date"
              id="birthDate"
              value={birthDate ? birthDate.toISOString().split('T')[0] : ''}
              onChange={(e) => onBirthDateChange(new Date(e.target.value))}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings