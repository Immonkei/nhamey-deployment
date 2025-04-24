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
    dietary_preferences,
    calories,
    protein,
    carbs,
    fat,
    ingredients,
    preparation_time_minutes,
  } = food;

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
    <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-10 mt-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={`https://nham-ey.istad.co${image_url}`}
            alt={name}
            className="w-full md:w-[400px] h-[350px] object-cover rounded-xl border border-gray-300"
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4 text-gray-800 dark:text-gray-100">
          <h1 className="text-4xl font-bold font-kh">{name}</h1>

          {/* Description */}
          <div>
            <p
              ref={descriptionRef}
              
            >
              {description}
            </p>
            
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {meal_types?.map((type, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-full"
              >
                {type}
              </span>
            ))}
            {category && (
              <span className="px-3 py-1 text-sm bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-white rounded-full">
                {category}
              </span>
            )}
            {dietary_preferences?.map((pref, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded-full"
              >
                {pref}
              </span>
            ))}
          </div>

          {/* Nutrition Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm mt-4">
            <div>
              <p className="font-semibold">Calories</p>
              <p>{calories}</p>
            </div>
            <div>
              <p className="font-semibold">Protein</p>
              <p>{protein}g</p>
            </div>
            <div>
              <p className="font-semibold">Carbs</p>
              <p>{carbs}g</p>
            </div>
            <div>
              <p className="font-semibold">Fat</p>
              <p>{fat}g</p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mt-4">
            <p className="font-semibold mb-1">Ingredients:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {ingredients?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          {/* Bottom Row: Price + Rating + Time */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-2xl font-bold text-green-600 dark:text-green-400 font-kh">
              {price}$
            </span>
            <div className="flex items-center gap-2">
              <svg
                className="w-6 h-6 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <span className="text-lg font-semibold">
                {average_rating ? average_rating.toFixed(1) : "No rating"}
              </span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Prep time: {preparation_time_minutes} mins
            </span>
          </div>

          
        </div>
      </div>
    </div>
  );
}
