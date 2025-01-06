import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../store/cartSlice'

export default function ProductCard({ id, name, price, image, description, rates }) {
  const dispatch = useDispatch()
  const selectedCountry = useSelector(state => state.currency.selectedCountry)

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price, image, quantity: 1 }))
  }

  const convertCurrency = (amount) => {

    return (amount * rates).toFixed(2);
  }

  const displayPrice = `${selectedCountry.symbol} ${convertCurrency(price)}`

  return (
    <Link to={`/products/${id}`} className="group relative block">
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
          <img
            src={image}
            alt={name}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700 dark:text-white">{name}</h3>
            {/* <p className="mt-1 text-sm text-gray-500">
              {description.length > 40 ? description.substring(0, 40) + '...' : description}
            </p> */}
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{displayPrice}</p>
        </div>
        <button
          className="mt-4 w-full bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md dark:hover:bg-gray-100 hover:scale-[1.01] transition-transform duration-200 ease-in-out text-sm sm:text-base"
        >
          View Product
        </button>
      </div>
    </Link>
  )
}
