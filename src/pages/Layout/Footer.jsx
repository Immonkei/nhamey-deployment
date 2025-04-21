import React from "react";

export default function Footer() {
  return (
    <footer className="bg-primary w-full py-10 px-4 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8 text-zinc-100 justify-center">
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

          
        </div>

        {/* Line and side-by-side layout */}
        <div className="border-t border-zinc-600 pt-4">
          <div className="flex flex-col md:flex-row items-center justify-center text-sm text-zinc-300 gap-2">
            <p>© 2025 NhamEy by ISTAD. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
