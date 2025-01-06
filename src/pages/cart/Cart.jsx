import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateQuantity, removeFromCart } from '../../store/cartSlice';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
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

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const convertCurrency = (amount) => {
    if (!rates) return amount;
    return (amount * rates).toFixed(2);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 dark:text-white">Your Cart</h1>
        {items.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 text-center">
            <p className="text-lg sm:text-xl mb-4 dark:text-white">Your cart is empty</p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">Price</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Quantity</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">Total</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-full object-cover" src={item.image} alt={item.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 sm:hidden">{selectedCountry.symbol}{convertCurrency(item.price)}</div>
                            {item.personalization && (
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {Object.entries(item.personalization).map(([key, value]) => (
                                  <div key={key}>{key}: {value}</div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">{selectedCountry.symbol}{convertCurrency(item.price)}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-gray-700 dark:text-gray-300">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">{selectedCountry.symbol}{convertCurrency(item.price * item.quantity)}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 sm:px-6 py-4 bg-gray-50 dark:bg-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-lg sm:text-xl font-bold dark:text-white">Total:</span>
                <span className="text-xl sm:text-2xl font-bold dark:text-white">{selectedCountry.symbol}{convertCurrency(total)}</span>
              </div>
              <button
                className="mt-4 w-full bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
