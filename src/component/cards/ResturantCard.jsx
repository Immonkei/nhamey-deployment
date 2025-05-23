import React from "react";
import { NavLink } from "react-router-dom"; // Correct import

export default function ResturantCard({ image_url, name, description, id }) {
  return (
    <NavLink
      to={`/restaurant/${id}`}
      className="group block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
    >
      <div className="w-full max-w-2xl h-auto md:h-56 flex flex-col md:flex-row bg-white dark:bg-[#696f74] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary dark:hover:border-yellow-400 hover:scale-[1.01]">
        
        {/* Image Section - Responsive */}
        <div className="w-full md:w-2/5 h-48 md:h-full">
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={image_url}
            alt={`${name} restaurant`}
            loading="lazy"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-3/5 p-5 flex flex-col text-left">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-1">
            {name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Rating Info */}
          <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-200">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.8 (120 reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
