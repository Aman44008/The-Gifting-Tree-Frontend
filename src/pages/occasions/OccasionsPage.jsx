'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'

const OCCASIONS = [
  { id: 'birthday', name: 'Birthday', image: '/placeholder.svg' },
  { id: 'anniversary', name: 'Anniversary', image: '/placeholder.svg' },
  { id: 'wedding', name: 'Wedding', image: '/placeholder.svg' },
  { id: 'graduation', name: 'Graduation', image: '/placeholder.svg' },
  { id: 'housewarming', name: 'Housewarming', image: '/placeholder.svg' },
  { id: 'babyshower', name: 'Baby Shower', image: '/placeholder.svg' },
  { id: 'christmas', name: 'Christmas', image: '/placeholder.svg' },
  { id: 'valentines', name: "Valentine's Day", image: '/placeholder.svg' },
  { id: 'mothersday', name: "Mother's Day", image: '/placeholder.svg' },
  { id: 'fathersday', name: "Father's Day", image: '/placeholder.svg' },
  { id: 'thanksgiving', name: 'Thanksgiving', image: '/placeholder.svg' },
  { id: 'easter', name: 'Easter', image: '/placeholder.svg' },
  { id: 'newyear', name: 'New Year', image: '/placeholder.svg' },
  { id: 'retirement', name: 'Retirement', image: '/placeholder.svg' },
  { id: 'engagement', name: 'Engagement', image: '/placeholder.svg' },
  { id: 'halloween', name: 'Halloween', image: '/placeholder.svg' },
  { id: 'promotion', name: 'Job Promotion', image: '/placeholder.svg' },
  { id: 'newbaby', name: 'New Baby', image: '/placeholder.svg' }
]

export default function OccasionsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOccasions = OCCASIONS.filter(occasion =>
    occasion.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16 dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Find the Perfect Gift for Every Occasion</h1>
        
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-white" />
            <input
              placeholder="Search occasions..."
              className="w-full pl-9 py-2 pr-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOccasions.map((occasion) => (
            <div key={occasion.id} className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:text-white">
              <img
                src={occasion.image}
                alt={occasion.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{occasion.name}</h3>
                <p className="text-sm text-gray-600 dark:text-white">Find the perfect gift</p>
              </div>
              <div className="px-6 py-4">
                <p className="text-sm text-gray-500 dark:text-white">
                  Discover our curated selection of gifts perfect for {occasion.name.toLowerCase()}.
                </p>
              </div>
              <div className="px-6 py-4 border-t">
                <button className="w-full bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 hover:scale-[1.01] transition-transform duration-200 ease-in-out text-sm sm:text-base">
                  <Link to={`/occasions/${occasion.id}`}>
                    Explore Gifts
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredOccasions.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No occasions found. Try a different search term.
          </p>
        )}
      </div>
    </div>
  )
}
