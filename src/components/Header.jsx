import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Calendar, Cross, Gift, LogIn, LogOut, Menu, Package, ShoppingCart, User, X } from 'lucide-react'
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { setSelectedCountry } from '../store/currencySlice'
import CountrySelector from './CountrySelector'

export default function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated) || false
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sidebarRef = useRef(null)
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCountry = useSelector((state) => state.currency.selectedCountry)
  const handleSelectCountry = (country) => {
    dispatch(setSelectedCountry(country))
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="border-b bg-white fixed top-0 left-0 right-0 z-50 dark:bg-gray-800 dark:text-white dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold text-primary">The Gifting Tree</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/products" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Products
            </Link>
            <Link to="/personalized" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Personalized
            </Link>
            <Link to="/occasions" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Occasions
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <CountrySelector onSelectCountry={handleSelectCountry} />
            <ThemeToggle />
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </Link>
            <Link to={isAuthenticated ? "/account" : "/login"} className="hidden md:block">
              <User className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
            </Link>
            <button onClick={toggleMenu} className="md:hidden">
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
            </button>
          </div>
        </div>
      </div>
        
      <div ref={sidebarRef} className={`bg-white fixed top-0 right-0 h-full border-l dark:border-gray-700 w-72 text-white z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden text-start dark:bg-gray-800 dark:text-white`}>
        {/* <FaAngleLeft/> */}
          <div className={`flex flex-col space-y-4 md:hidden pl-4 pr-4`}>
            <div className='mt-6 flex justify-between items-center'>
              <p className='text-lg font-medium text-black dark:text-white'>Menu</p>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className='h-5 w-5 text-black hover:border-[1px] hover:border-spacing-4 hover:border-black hover:rounded-[4px] hover:bg-slate-100 dark:text-white dark:hover:text-black' />
              </button>
            </div>
            <Link to={isAuthenticated ? "/account" : "/login"} className="text-lg font-normal text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <User className="h-5 w-5" />
              Account
            </Link>
            <Link
              to="/products"
              className="text-lg font-normal text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              to="/personalized"
              className="text-lg font-normal text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Gift className="h-5 w-5" />
              Personalized
            </Link>
            <Link
              to="/occasions"
              className="text-lg font-normal text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar className="h-5 w-5" />
              Occasions
            </Link>
            {user && (
              <div className="text-lg font-normal text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white cursor-pointer flex items-center gap-2" onClick={()=>{
                handleLogout()
                setIsMenuOpen(false)
              }}>
                <LogOut className="h-5 w-5" />
                Logout
              </div>
            )}
            {!user && (
              <Link className="text-lg font-normal text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center gap-2" to="/login" onClick={()=>{
                setIsMenuOpen(false)
              }}>
                <LogIn className="h-5 w-5" />
                Login
              </Link>
            )}
          </div>
      </div>

    </header>
  )
}
