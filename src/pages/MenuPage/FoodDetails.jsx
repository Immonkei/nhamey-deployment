import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FoodDetailCard from "../../component/cards/FoodDetailCard";
import { ArrowLeft } from "lucide-react"; // optional icon package

export default function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
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
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm sm:text-base text-primary dark:text-primary hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to food 
        </button>



        {food ? (
          <FoodDetailCard food={food} />
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            Loading...
          </p>
        )}
      </div>
    </main>
  );
}