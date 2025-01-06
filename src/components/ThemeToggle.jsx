import React from 'react'
import { useTheme } from './ThemeProvider'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={() => toggleTheme()}
      className="p-2 rounded-full bg-gray-200 text-gray-800 dark:text-gray-800 transition-colors duration-500"
    >
      <div className="relative w-5 h-5">
        <Moon
          size={20}
          className={`absolute text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-opacity duration-500 ${
            theme === 'light' ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <Sun
          size={20} 
          className={`absolute text-gray-600 dark:text-gray-800 hover:text-gray-900 dark:hover:text-gray-700 transition-opacity duration-500 ${
            theme === 'light' ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </button>
  )
}

