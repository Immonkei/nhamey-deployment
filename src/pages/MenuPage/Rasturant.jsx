import React from "react";
import RestaurantCard from "../../component/cards/ResturantCard";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Rasturant() {
  const [Rasturant, setRasturant] = useState([]);

  async function getRasturant() {
    const Rasturants = await fetch("https://nham-ey.istad.co/restaurants").then(
      (response) => response.json()
    );
    setRasturant(Rasturants);
  }

  useEffect(() => {
    getRasturant();
  }, []);

  const base_url = `https://nham-ey.istad.co`;

  return (
    <main className="dark:bg-gray-900 dark:text-white py-10">
      <div className="text-center">
          <h1 className="text-primary text-[32px] dark:text-gray-200 font-bold">RESTAURANTS LIST</h1>
          <div className="flex justify-center mt-2">
            <svg width="372" height="4" viewBox="0 0 372 4" fill="none">
              <line x1="0" y1="2.25" x2="185.666" y2="2.25" stroke="black" strokeWidth="3" />
              <path d="M185.664 2.25H371.093" stroke="#75A511" strokeWidth="3" />
            </svg>
          </div>
      </div>
      <div className="flex justify-center mx-6 my-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Rasturant.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id} // Added this line to pass the id
              name={restaurant.name}
              image_url={`${base_url}${restaurant.image_url}`}
              description={restaurant.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
