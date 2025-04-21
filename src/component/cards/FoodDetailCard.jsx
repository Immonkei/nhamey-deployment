"use client";

import { useState, useEffect, useRef } from "react";

export default function FoodDetailCard({ food }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowToggle, setShouldShowToggle] = useState(false);
  const descriptionRef = useRef(null);

  if (!food) return null;

  const {
    name,
    description,
    image_url,
    price,
    average_rating,
    category,
    meal_types,
  } = food;

  // Measure height after rendering
  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const maxLines = 3;
      const maxHeight = lineHeight * maxLines;
      if (el.scrollHeight > maxHeight) {
        setShouldShowToggle(true);
      }
    }
  }, [description]);

  const toggleDescription = () => setIsExpanded(!isExpanded);

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6 sm:p-8 mt-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={`https://nham-ey.istad.co${image_url}`}
            alt={name}
            className="w-full md:w-[400px] h-[350px] object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1">
          
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white font-kh">
              {name}
            </h1>

            {/* Description with toggle */}
            <p
              
              className="mt-2 text-gray-600 dark:text-gray-300 text-base leading-relaxed transition-all duration-300 $"
              
            >
              {description}
            </p>

            {/* Show toggle only if overflow */}
            {/* {shouldShowToggle && (
              <button
                className="mt-1 text-sm text-primary hover:underline"
                onClick={toggleDescription}
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )} */}

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {meal_types?.map((type, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-primary text-white rounded-full capitalize"
                >
                  {type}
                </span>
              ))}
              {category && (
                <span className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-full capitalize">
                  {category}
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            {/* Price */}
            <span className="text-2xl text-green-600 dark:text-green-400 font-bold font-kh">
              {price}$
            </span>

            {/* Rating */}
            <div className="flex items-center">
              <svg
                className="w-[26px] h-[26px] text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                {average_rating ? average_rating.toFixed(1) : "No rating"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
