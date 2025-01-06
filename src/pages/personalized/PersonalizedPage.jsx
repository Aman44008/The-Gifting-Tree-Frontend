'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../store/cartSlice'

const PERSONALIZATION_OPTIONS = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'date', label: 'Special Date', type: 'date' },
  { id: 'message', label: 'Custom Message', type: 'textarea' },
]

export default function PersonalizedPage() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [personalization, setPersonalization] = useState({})
  const dispatch = useDispatch()
  const selectedCountry = useSelector(state => state.currency.selectedCountry)
  const [rates, setRates] = useState(null)

  const handlePersonalizationChange = (id, value) => {
    setPersonalization(prev => ({ ...prev, [id]: value }))
  }

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart({
        ...selectedProduct,
        personalization,
        quantity: 1,
      }))
      // Reset form after adding to cart
      setSelectedProduct(null)
      setPersonalization({})
    }
  }

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

  const convertCurrency = (amount) => {
    if (!rates) return amount;
    return (amount * rates).toFixed(2);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16 dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">Create Your Personalized Gift</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((product) => (
            <div key={product} className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:text-white">
              <img
                src="/placeholder.svg"
                alt={`Personalized Product ${product}`}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Personalized Product {product}</h2>
                <p className="text-sm text-gray-600 dark:text-white">Create your unique gift</p>
                <p className="text-sm text-gray-500 mt-4 dark:text-white">
                  Customize this product with your personal touch.
                </p>
                <div className="mt-6">
                  <button 
                    onClick={() => setSelectedProduct({ id: `personalized-${product}`, name: `Personalized Product ${product}`, price: 2474.92 })}
                    className="w-full bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 hover:scale-[1.01] transition-transform duration-200 ease-in-out text-sm sm:text-base"
                  >
                    Personalize Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personalize Your {selectedProduct.name}</h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Add your custom details below</p>
                  </div>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 transition-colors"
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="image-upload"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Upload Image
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePersonalizationChange('image', e.target.files[0])}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  {PERSONALIZATION_OPTIONS.map((option) => (
                    <div key={option.id} className="space-y-2">
                      <label 
                        htmlFor={option.id}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        {option.label}
                      </label>
                      {option.type === 'textarea' ? (
                        <textarea
                          id={option.id}
                          value={personalization[option.id] || ''}
                          onChange={(e) => handlePersonalizationChange(option.id, e.target.value)}
                          placeholder={`Enter your ${option.label.toLowerCase()}`}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] resize-y dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                      ) : (
                        <input
                          id={option.id}
                          type={option.type}
                          value={personalization[option.id] || ''}
                          onChange={(e) => handlePersonalizationChange(option.id, e.target.value)}
                          placeholder={`Enter ${option.label.toLowerCase()}`}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
                  >
                    <span>Add to Cart</span>
                    <span className="text-sm">- {selectedCountry.symbol}{convertCurrency(selectedProduct.price)}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
