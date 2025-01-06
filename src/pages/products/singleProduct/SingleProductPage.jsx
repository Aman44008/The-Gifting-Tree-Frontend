import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart } from 'lucide-react'
import { addToCart } from '../../../store/cartSlice'

const MOCK_PRODUCT = {
  id: '1',
  name: 'Custom Photo Frame',
  price: 2572.14,
  image: '/placeholder.svg',
  description: 'Beautiful wooden frame with your favorite photo. Perfect for capturing and displaying your cherished memories.',
  details: [
    'High-quality wood construction',
    'Available in multiple sizes',
    'Customizable with your own photos',
    'Protective glass cover',
    'Easy to hang or display on a shelf'
  ]
}

export default function SingleProductPage() {
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const { id } = useParams()

  const product = MOCK_PRODUCT

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }))
  }
  const selectedCountry = useSelector(state => state.currency.selectedCountry)

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

  const convertCurrency = (amount) => {
    return (amount * rates).toFixed(2);
  }

  const displayPrice = `${selectedCountry.symbol} ${convertCurrency(product.price)}`


  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 dark:text-white mt-16">
      <div className="max-w-7xl mx-auto">
        <button
          className="flex items-center mb-8 px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold dark:text-white">{product.name}</h1>
            <p className="text-2xl font-semibold dark:text-white">{displayPrice}</p>
            <p className="text-gray-600 dark:text-gray-300">{product.description}</p>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Product Details:</h2>
              <ul className="list-disc list-inside space-y-1">
                {product.details.map((detail, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-300">{detail}</li>
                ))}
              </ul>
            </div>

            <div className="border rounded-lg p-4 space-y-4 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium dark:text-gray-300">Quantity:</span>
                <div className="flex items-center">
                  <button
                    className="p-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 dark:hover:bg-gray-700 dark:text-white"
                    onClick={decrementQuantity}
                    disabled={quantity === 1}
                  >
                    <Minus className="h-4 w-4 dark:text-white" />
                  </button>
                  <span className="mx-4 text-lg font-semibold">{quantity}</span>
                  <button
                    className="p-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white"
                    onClick={incrementQuantity}
                  >
                    <Plus className="h-4 w-4 dark:text-white" />
                  </button>
                </div>
              </div>
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
