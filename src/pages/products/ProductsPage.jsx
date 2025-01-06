import { useEffect, useState } from 'react'
import { Filter, Search } from 'lucide-react'
import ProductCard from '../../components/ProductCard'
import { useSelector } from 'react-redux'

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Custom Photo Frame', 
    price: 2474.92,
    image: '/placeholder.svg',
    description: 'Beautiful wooden frame with your favorite photo'
  },
  {
    id: '2',
    name: 'Personalized Mug',
    price: 1649.92,
    image: '/placeholder.svg', 
    description: 'Ceramic mug with custom design'
  },
  {
    id: '3',
    name: 'Custom Canvas Print',
    price: 4124.92,
    image: '/placeholder.svg',
    description: 'High-quality canvas print of your photos'
  },
  {
    id: '4',
    name: 'Engraved Jewelry Box',
    price: 3299.92,
    image: '/placeholder.svg',
    description: 'Elegant wooden jewelry box with custom engraving'
  },
  {
    id: '5', 
    name: 'Custom Phone Case',
    price: 2062.42,
    image: '/placeholder.svg',
    description: 'Durable phone case with your favorite design'
  },
  {
    id: '6',
    name: 'Personalized Cutting Board',
    price: 2887.42,
    image: '/placeholder.svg',
    description: 'Handcrafted wooden cutting board with custom text'
  },
  {
    id: '7',
    name: 'Custom Wall Clock',
    price: 3712.42,
    image: '/placeholder.svg',
    description: 'Modern wall clock with personalized face design'
  },
  {
    id: '8',
    name: 'Engraved Wine Glasses',
    price: 2474.92,
    image: '/placeholder.svg',
    description: 'Set of 2 elegant wine glasses with custom engraving'
  },
  {
    id: '9',
    name: 'Custom Door Mat',
    price: 2724.92,
    image: '/placeholder.svg',
    description: 'Durable welcome mat with personalized message'
  },
  {
    id: '10',
    name: 'Photo Blanket',
    price: 4949.92,
    image: '/placeholder.svg',
    description: 'Soft fleece blanket with your cherished photos'
  },
  {
    id: '11',
    name: 'Personalized Keychain',
    price: 1237.42,
    image: '/placeholder.svg',
    description: 'Metal keychain with custom engraving or photo'
  },
  {
    id: '12',
    name: 'Custom Pet Portrait',
    price: 6599.92,
    image: '/placeholder.svg',
    description: 'Hand-drawn digital portrait of your beloved pet'
  },
  {
    id: '13',
    name: 'Personalized Garden Stone',
    price: 2312.42,
    image: '/placeholder.svg',
    description: 'Decorative garden stone with custom text or design'
  },
  {
    id: '14',
    name: 'Custom Recipe Book',
    price: 2887.42,
    image: '/placeholder.svg',
    description: 'Hardcover recipe book with personalized cover and pages'
  },
  {
    id: '15',
    name: 'Engraved Watch',
    price: 7424.92,
    image: '/placeholder.svg',
    description: 'Classic timepiece with custom engraving on back'
  }
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const selectedCountry = useSelector(state => state.currency.selectedCountry)

  const filteredProducts = MOCK_PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const [rates, setRates] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/556fedc3b1da612643488fc7/latest/INR`
        );
        const data = await response.json();
        setRates(data.conversion_rates[selectedCountry.currency]);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        setRates(1);
      }
    };

    fetchExchangeRates();
  }, [selectedCountry.currency]);

  return (
    <div className="min-h-screen bg-gray-50 mt-16 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Products</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-9 py-2 pr-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md flex items-center text-gray-900 dark:text-white dark:border-gray-700"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>

              {showFilters && (
                <div className="fixed border-l border-gray-300 dark:border-gray-700 inset-y-0 right-0 w-64 bg-white shadow-lg p-4 z-50 dark:bg-gray-800 dark:text-white">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Categories</h2>
                    <button className="text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-300 text-2xl" onClick={() => setShowFilters(false)}>&times;</button>
                  </div>
                  
                  <div className="space-y-4">
                    <button
                      className={`w-full text-left px-4 py-2 rounded-md text-gray-900 dark:text-white ${
                        selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:text-black'
                      }`}
                      onClick={() => {setSelectedCategory('all'); setShowFilters(false); setSearchQuery('')}}
                    >
                      All Products
                    </button>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-md text-gray-900 dark:text-white ${
                        selectedCategory === 'frames' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:text-black'
                      }`}
                      onClick={() => {setSelectedCategory('frames'); setShowFilters(false); setSearchQuery('frame')}}
                    >
                      Photo Frames
                    </button>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-md text-gray-900 dark:text-white ${
                        selectedCategory === 'mugs' ? 'bg-blue-500 text-white ' : 'hover:bg-gray-100 dark:hover:text-black'
                      }`}
                      onClick={() => {setSelectedCategory('mugs'); setShowFilters(false); setSearchQuery('mug')}}
                    >
                      Mugs
                    </button>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-md text-gray-900 dark:text-white ${
                        selectedCategory === 'canvas' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:text-black'
                      }`}
                      onClick={() => {setSelectedCategory('canvas'); setShowFilters(false); setSearchQuery('canvas')}}
                    >
                      Canvas Prints
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} rates={rates} />
          ))}
        </div>
      </div>
    </div>
  )
}