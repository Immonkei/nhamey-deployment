import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

export default function FoodCard({
  id,
  image_url,
  name,
  description,
  price,
  average_rating,
  isWishlisted = false,
  wishlistId = null,
  toggleWishlist,
}) {
  const [isInWishlist, setIsInWishlist] = useState(isWishlisted);

  useEffect(() => {
    setIsInWishlist(isWishlisted);
  }, [isWishlisted]);

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("🔒 You need to be logged in");
      return;
    }

    const wasInWishlist = isInWishlist;
    setIsInWishlist(!wasInWishlist); // Optimistic UI update

    try {
      if (wasInWishlist && wishlistId) {
        const res = await fetch(
          `https://nham-ey.istad.co/wishlist/${wishlistId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          toast.success("💔 Removed from wishlist");
          toggleWishlist && toggleWishlist(id, null); // pass null to remove
        } else {
          throw new Error("Failed to remove from wishlist");
        }
      } else {
        const res = await fetch("https://nham-ey.istad.co/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ food_item_id: id }),
        });

        if (res.ok) {
          const result = await res.json(); // get new wishlist ID
          toast.success("❤️ Added to wishlist");
          toggleWishlist && toggleWishlist(id, result.id); // pass ID to add
        } else {
          throw new Error("Failed to add to wishlist");
        }
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast.error("⚠️ Something went wrong");
      setIsInWishlist(wasInWishlist); // Revert change
    }
  };

  const baseURL = "https://nham-ey.istad.co";
  const validImageUrl = image_url?.startsWith("http")
    ? image_url
    : image_url
    ? `${baseURL}${image_url}`
    : "/placeholder-image.png";

  return (
    <NavLink to={`/food/${id}`}>
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[400px] bg-white dark:bg-gray-600 rounded-xl shadow-sm hover:ring-2 hover:ring-primary hover:scale-101 transition duration-200 relative">
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 bg-white/80 rounded-full hover:bg-white"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill={isInWishlist ? "red" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Image */}
        <div className="relative px-3 py-3 bg-[#fafaf9] dark:bg-gray-700 rounded-t-xl">
          <img
            className="w-full h-40 sm:h-48 md:h-52 object-cover rounded-lg"
            src={validImageUrl}
            alt={name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder-image.png";
            }}
          />
        </div>


        {/* Content */}
        <div className="p-3 sm:p-4">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#494949] dark:text-gray-100 line-clamp-1">
            {name || "Unnamed food"}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1 line-clamp-3 leading-snug">
            {description || "No description available."}
          </p>

          {/* Price and Rating */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-green-600 dark:text-green-400 font-bold text-base sm:text-lg md:text-xl">
              ${price ?? "?"}
            </span>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p className="ml-1 text-xs sm:text-sm md:text-base font-bold text-gray-900 dark:text-white">
                {average_rating ? average_rating.toFixed(1) : "No rating"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
