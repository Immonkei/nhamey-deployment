import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaClock, FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaFacebook, FaInstagram, FaUtensils, FaRegCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { IoRestaurant, IoTime, IoCall, IoMail, IoGlobe, IoLocation, IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const base_url = `https://nham-ey.istad.co`;

  useEffect(() => {
    async function fetchRestaurantDetail() {
      try {
        setIsLoading(true);
        const res = await fetch(`${base_url}/restaurants/${id}`);
        const data = await res.json();
        setRestaurant(data);
      } catch (err) {
        console.error("Failed to fetch restaurant detail:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRestaurantDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary dark:border-yellow-400 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading restaurant details...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Restaurant Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">We couldn't find the restaurant you're looking for.</p>
          <button 
            onClick={() => window.history.back()} 
            className="px-6 py-2 bg-primary hover:bg-primary-dark dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="dark:bg-gray-900 dark:text-white min-h-screen pb-20 bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
        )}
        <img
          src={`${base_url}${restaurant.image_url}`}
          alt={restaurant.name}
          className={`w-full h-full object-contain transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {restaurant["cuisine types"]?.map((cuisine, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-primary/20 text-primary dark:bg-yellow-400/20 dark:text-yellow-400 rounded-full text-sm font-medium backdrop-blur-sm"
                >
                  {cuisine}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">{restaurant.name}</h1>
            <div className="flex items-center text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-5 h-5 drop-shadow-sm" />
              ))}
              <span className="ml-2 text-white/90">4.8 (120 reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-none">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
         
          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span className="w-1 h-8 bg-primary dark:bg-yellow-400 rounded-full"></span>
                    About {restaurant.name}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{restaurant.description}</p>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <IoTime className="text-primary dark:text-yellow-400" />
                      Opening Hours
                    </h3>
                    <ul className="space-y-3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      {Object.entries(restaurant.opening_hours || {}).map(([day, hours]) => (
                        <li key={day} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600 last:border-0">
                          <span className="font-medium text-gray-700 dark:text-gray-300">{day}</span>
                          <span className="text-gray-600 dark:text-gray-400">{hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <IoLocation className="text-primary dark:text-yellow-400" />
                      Location & Contact
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <FaMapMarkerAlt className="text-primary dark:text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium">{restaurant.address}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {restaurant.city}, {restaurant.state} {restaurant.pasta_code}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{restaurant.country}</p>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <IoCall className="text-primary dark:text-yellow-400 mr-3 flex-shrink-0" />
                        <a href={`tel:${restaurant.phone}`} className="hover:underline hover:text-primary dark:hover:text-yellow-400 transition-colors">
                          {restaurant.phone}
                        </a>
                      </li>
                      <li className="flex items-center">
                        <IoMail className="text-primary dark:text-yellow-400 mr-3 flex-shrink-0" />
                        <a href={`mailto:${restaurant.email}`} className="hover:underline hover:text-primary dark:hover:text-yellow-400 transition-colors break-all">
                          {restaurant.email}
                        </a>
                      </li>
                      <li className="flex items-center">
                        <IoGlobe className="text-primary dark:text-yellow-400 mr-3 flex-shrink-0" />
                        <a 
                          href={restaurant.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:underline hover:text-primary dark:hover:text-yellow-400 transition-colors break-all"
                        >
                          {restaurant.website.replace(/^https?:\/\//, '')}
                        </a>
                      </li>
                    </ul>

                    {restaurant.social_world && (restaurant.social_world.facebook || restaurant.social_world.instagram) && (
                      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <h4 className="text-sm font-medium mb-3">Follow Us</h4>
                        <div className="flex space-x-4">
                          {restaurant.social_world.facebook && (
                            <a 
                              href={restaurant.social_world.facebook} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 bg-blue-600/10 hover:bg-blue-600/20 dark:bg-blue-400/10 dark:hover:bg-blue-400/20 rounded-full transition-colors"
                              aria-label="Facebook"
                            >
                              <IoLogoFacebook className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </a>
                          )}
                          {restaurant.social_world.instagram && (
                            <a 
                              href={restaurant.social_world.instagram} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 bg-pink-600/10 hover:bg-pink-600/20 dark:bg-pink-400/10 dark:hover:bg-pink-400/20 rounded-full transition-colors"
                              aria-label="Instagram"
                            >
                              <IoLogoInstagram className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaMoneyBillWave className="text-primary dark:text-yellow-400" />
                      Price Range
                    </h3>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-800 dark:text-white">${restaurant.price_cover}</span>
                      <span className="ml-2 text-gray-600 dark:text-gray-400">per person</span>
                    </div>
                    <div className="mt-3 flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <span key={i} className="w-full h-1 bg-primary/30 dark:bg-yellow-400/30 rounded-full"></span>
                      ))}
                      <span className="w-full h-1 bg-gray-200 dark:bg-gray-600 rounded-full"></span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Moderate pricing</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 dark:bg-yellow-400/10 rounded-full flex items-center justify-center">
                    <FaUtensils className="text-3xl text-primary dark:text-yellow-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Menu Coming Soon</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We're currently curating our delicious menu offerings. Check back soon for mouth-watering dishes!
                  </p>
                  <button 
                    onClick={() => setActiveTab('overview')} 
                    className="px-6 py-2 bg-primary hover:bg-primary-dark dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white rounded-lg transition-colors"
                  >
                    View Restaurant Info
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 dark:bg-yellow-400/10 rounded-full flex items-center justify-center">
                    <FaStar className="text-3xl text-primary dark:text-yellow-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Reviews Coming Soon</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We're collecting authentic reviews from our valued customers. Be the first to share your experience!
                  </p>
                  <button 
                    onClick={() => setActiveTab('overview')} 
                    className="px-6 py-2 bg-primary hover:bg-primary-dark dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white rounded-lg transition-colors"
                  >
                    View Restaurant Info
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 dark:bg-yellow-400/10 rounded-full flex items-center justify-center">
                    <FaRegCalendarAlt className="text-3xl text-primary dark:text-yellow-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Photos Coming Soon</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We're gathering beautiful visuals of our restaurant and dishes. Stay tuned for a visual feast!
                  </p>
                  <button 
                    onClick={() => setActiveTab('overview')} 
                    className="px-6 py-2 bg-primary hover:bg-primary-dark dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white rounded-lg transition-colors"
                  >
                    View Restaurant Info
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}