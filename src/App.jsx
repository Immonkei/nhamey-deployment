import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import FoodCard from "./component/cards/FoodCard";
import FoodCategory from "./component/cards/FoodCategory";
import ResturantCard from "./component/cards/ResturantCard";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [food, setFood] = useState([]);
  const [trendingFood, setTrendingFood] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [trendingRestaurant, setTrendingRestaurant] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const base_url = `https://nham-ey.istad.co`;

  async function getFood() {
    try {
      const foods = await fetch(`${base_url}/food-items`).then((res) =>
        res.json()
      );
      setFood(foods);
      const trending = [...foods]
        .sort((a, b) => b.average_rating - a.average_rating)
        .slice(0, 6);
      setTrendingFood(trending);
    } catch (error) {
      console.error("Error fetching food:", error);
    }
  }

  async function getRestaurant() {
    try {
      const data = await fetch(`${base_url}/restaurants`).then((res) =>
        res.json()
      );
      setRestaurant(data);
      const trending = [...data]
        .sort((a, b) => b.average_rating - a.average_rating)
        .slice(0, 4);
      setTrendingRestaurant(trending);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getFood(), getRestaurant()]).finally(() =>
      setIsLoading(false)
    );
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading content...</p>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <main className="dark:bg-gray-900 pb-1">
        {/* HERO SECTION */}
        <section className="w-full min-h-screen relative overflow-hidden bg-[url('/Assets/background.png')] bg-cover bg-center bg-no-repeat flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/30 dark:from-gray-800/80 dark:to-gray-800/30 rounded-br-[50%] md:rounded-br-[40%] lg:rounded-br-[30%] backdrop-blur-sm z-0"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between relative z-10">
            <div className="w-full lg:w-1/2 py-12 lg:py-24 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white uppercase tracking-tight leading-snug">
                Experience Authentic <span className="block text-primary dark:text-[#58b8ee]">Cambodian Cuisine</span>
              </h1>
              <div className="flex items-center">
                <div className="w-16 h-1 bg-primary mr-4"></div>
                <p className="text-lg md:text-xl text-gray-700 dark:text-white">
                  Premium Dining Experience
                </p>
              </div>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-lg">
                Discover the rich flavors and traditions of Cambodia at Nham Ey. Our chefs bring generations of culinary heritage to your plate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <NavLink 
                  to="/food" 
                  className="px-8 py-3 bg-primary hover:bg-primary-dark text-white text-lg font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Explore Foods
                </NavLink>
                <NavLink 
                  to="/restaurant" 
                  className="px-8 py-3 border-2 border-primary dark:border-gray-300 text-primary dark:text-white hover:bg-primary/10 text-lg font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  View Restaurants
                </NavLink>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
                <img
                  src="/Assets/imghome.png"
                  alt="Authentic Cambodian Salad"
                  className="w-full h-auto object-contain rotate-x-15 -rotate-y-30"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full blur-xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY SECTION */}
        <div className="text-center my-12">
          <h1 className="text-primary text-[32px] dark:text-gray-200 font-bold">OUR CATEGORIES</h1>
          <div className="flex justify-center mt-2">
            <svg width="372" height="4" viewBox="0 0 372 4" fill="none">
              <line x1="0" y1="2.25" x2="185.666" y2="2.25" stroke="black" strokeWidth="3" />
              <path d="M185.664 2.25H371.093" stroke="#75A514" strokeWidth="3" />
            </svg>
          </div>
          <div className="flex justify-center my-10">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <NavLink to="/food?category=breakfast">
                <FoodCategory image="/images/food/breakfast.png" title="Breakfast" />
              </NavLink>
              <NavLink to="/food?category=lunch">
              <FoodCategory image="/images/food/lunch.png" title="Lunch" />
              </NavLink>
              <NavLink to="/food?category=dessert">
              <FoodCategory image="/images/food/dessert.png" title="Dessert" />
              </NavLink>
              <NavLink to="/food?category=snack">
              <FoodCategory image="/images/food/fast_food.png" title="Snack" />
              </NavLink>
            </div>
          </div>
        </div>

        {/* TOP RESTAURANT */}
        <div className="text-center">
          <h1 className="text-primary text-[32px] dark:text-gray-200 font-bold">TOP RESTAURANTS</h1>
          <div className="flex justify-center mt-2">
            <svg width="372" height="4" viewBox="0 0 372 4" fill="none">
              <line x1="0" y1="2.25" x2="185.666" y2="2.25" stroke="black" strokeWidth="3" />
              <path d="M185.664 2.25H371.093" stroke="#75A511" strokeWidth="3" />
            </svg>
          </div>
          <div className="flex justify-center">
            <div className="grid max-w-500 sm:grid-cols-1 md:grid-cols-2 gap-6 px-4 mt-10">
              {trendingRestaurant.map((res) => (
                <ResturantCard
                  key={`trending-${res.id}`}
                  id={res.id} // pass ID to ResturantCard
                  name={res.name}
                  image_url={`${base_url}${res.image_url}`}
                  description={res.description}
                  average_rating={res.average_rating}
                  isTrending={true}
                />
              ))}
            </div>
          </div>
        </div>

        {/* BANNER */}
        <div className="bg-bg-2 dark:bg-gray-500 w-full my-12 flex flex-col md:flex-row items-center justify-center px-4 md:px-12 lg:px-24 h-auto md:h-[193px] space-y-6 md:space-y-0">
  {/* Text Section */}
  <div className="text-left md:mr-50">
    <h1 className="text-4xl md:text-5xl lg:text-6xl text-primary dark:text-green-400 font-bold">
      Good Food
    </h1>
    <h2 className="text-2xl md:text-3xl text-zinc-700 dark:text-zinc-200 font-bold">
      Great time!
    </h2>
    <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-300 mt-2 mx-auto md:mx-0">
      Enjoy your day with many foods. Find your favorite dishes. Our site gives you
      info about the foods you like.
    </p>
  </div>

  {/* Image Section */}
  <div className="hidden md:block w-60 md:w-72 lg:w-80">
    <img
      src="/images/img-style.png"
      alt="Decorative Banner"
      className="w-full h-auto object-contain"
    />
  </div>
</div>


        {/* TRENDING FOODS */}
        <section className="mb-12">
          <div className="text-center">
            <h1 className="text-primary text-[32px] font-bold">TRENDING FOOD</h1>
            <div className="flex justify-center mt-2">
              <svg width="372" height="4" viewBox="0 0 372 4" fill="none">
                <line x1="0" y1="2.25" x2="185.666" y2="2.25" stroke="black" strokeWidth="3" />
                <path d="M185.664 2.25H371.093" stroke="#75A511" strokeWidth="3" />
              </svg>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4">
              {trendingFood.map((food) => (
                <FoodCard
                  key={`trending-${food.id}`}
                  id={food.id} // pass ID to FoodCard
                  name={food.name}
                  price={food.price}
                  image_url={`${base_url}${food.image_url}`}
                  description={food.description}
                  average_rating={food.average_rating}
                  category={food.category}
                  isTrending={true}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
