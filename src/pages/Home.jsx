import { Link } from "react-router-dom"
import image from "../assets/images/home.jpg"

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                  Create lasting memories with personalized gifts
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
                  Discover our collection of customizable gifts perfect for any occasion. From photo frames to custom prints,
                  make every moment special.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <button className="w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 hover:scale-105 transition-transform duration-200 ease-in-out text-sm sm:text-base">
                    <Link to="/products">
                      Shop Now
                    </Link>
                  </button>
                  <button className="w-full sm:w-auto bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-md border border-black dark:border-white hover:bg-gray-50 dark:hover:bg-gray-700 text-sm sm:text-base hover:scale-105 transition-transform duration-200 ease-in-out">
                    <Link to="/personalized">
                      Customize Gifts
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            src={image}
            alt="Gift collection"
            width={1000}
            height={1000}
            className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Featured Categories</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-white">
            Explore our most popular gift categories
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((category) => (
            <div key={category} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                  src="/placeholder.svg"
                  alt={`Category ${category}`}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-6 text-sm text-gray-500 dark:text-white">
                <Link to={`/category/${category}`}>
                  <span className="absolute inset-0" />
                  Category {category}
                </Link>
              </h3>
              <p className="text-base font-semibold text-gray-900 dark:text-white">Discover amazing gifts</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

