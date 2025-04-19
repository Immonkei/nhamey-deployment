import React from "react";

export default function Footer() {
  return (
    <footer className="bg-primary w-full py-10 px-4 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="font-bold text-3xl pb-2">NhamEy</h1>
          <p className="text-zinc-200 font-medium max-w-xl mx-auto">
            Nham Ey is a simple and modern platform that helps users easily discover restaurants and delicious meals through search, filters, and personalized features.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8 text-zinc-100 justify-center">
          <div className="mx-auto">
            <h3 className="font-semibold text-lg mb-4 text-white">Contents</h3>
            <ul className="space-y-2">
              <li>Home</li>
              <li>Food</li>
              <li>Restaurant</li>
              <li>About</li>
            </ul>
          </div>

          <div className="mx-auto">
            <h3 className="font-semibold text-lg mb-4 text-white">Tech Stack</h3>
            <ul className="space-y-2">
              <li>HTML</li>
              <li>Tailwind</li>
              <li>React Js</li>
              <li>Git</li>
            </ul>
          </div>

          <div className="mx-auto">
            <h3 className="font-semibold text-lg mb-4 text-white">Features</h3>
            <ul className="space-y-2">
              <li>Wishlist</li>
              <li>Search</li>
              <li>Register</li>
              <li>Filter</li>
            </ul>
          </div>

          <div className="mx-auto col-span-2 md:col-span-1">
            <h3 className="font-semibold text-lg mb-4 text-white">Organized By</h3>
            <div className="flex justify-center">
              <img
                src="https://www.cstad.edu.kh/icon.png?ff407d7ec1c2072a"
                alt="ISTAD logo"
                className="w-24 h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Thin line and copyright */}
        <div className="border-t border-zinc-600 pt-4 text-sm text-zinc-300">
          © 2025 NhamEy by ISTAD. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
