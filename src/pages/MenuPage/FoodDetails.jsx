import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FoodDetailCard from "../../component/cards/FoodDetailCard";

export default function FoodDetails() {
  const { id } = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const res = await fetch(`https://nham-ey.istad.co/food-items/${id}`);
        const data = await res.json();
        setFood(data);
      } catch (err) {
        console.error("Error fetching food detail:", err);
      }
    };

    fetchFoodDetails();
  }, [id]);

  return (
    <main className="pt-6 sm:pt-8 pb-8 sm:pb-12 px-4 sm:px-6 md:px-10 dark:bg-gray-900 min-h-screen">
      <div className="text-center mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-800 dark:text-white">
          Food Details
        </h1>
      </div>

      {food ? (
        <div className="max-w-5xl mx-auto">
          <FoodDetailCard food={food} />
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300 text-base sm:text-lg">
          Loading...
        </p>
      )}
    </main>
  );
}
