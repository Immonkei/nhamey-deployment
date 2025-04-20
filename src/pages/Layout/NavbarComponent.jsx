"use client"

import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { Menu, X } from "lucide-react"

export default function NavbarComponent() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [menuOpen])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    setMenuOpen(false)
  }

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-lime-500 font-semibold transition-colors duration-200"
      : "text-gray-700 dark:text-gray-300 hover:text-lime-500 transition-colors duration-200"

  return (
    <header className="bg-gray-100 dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <NavLink to="/" className="block">
            <img src="./public/images/Nham-Ey.png" alt="nham ey logo" className="h-18" />
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex mx-8 flex-1 justify-center">
          <ul className="flex items-center space-x-8 text-lg font-medium">
            <li>
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/food" className={navLinkClass}>Food</NavLink>
            </li>
            <li>
              <NavLink to="/restaurant" className={navLinkClass}>Restaurant</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
            </li>
          </ul>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <NavLink
                to="/wishlist"
                className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition-colors duration-200"
              >
                Wishlist
              </NavLink>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <NavLink
                to="/login"
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-lime-500 transition-colors duration-200"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition-colors duration-200"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-lime-500 focus:outline-none"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open menu</span>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white dark:bg-gray-800 shadow-lg px-4 py-5 border-t border-gray-100 dark:border-gray-700">
          <nav className="flex flex-col space-y-4 mb-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 px-1 ${
                  isActive ? "text-lime-500 font-semibold" : "text-gray-700 dark:text-gray-300"
                } hover:text-lime-500`
              }
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/food"
              className={({ isActive }) =>
                `block py-2 px-1 ${
                  isActive ? "text-lime-500 font-semibold" : "text-gray-700 dark:text-gray-300"
                } hover:text-lime-500`
              }
              onClick={() => setMenuOpen(false)}
            >
              Food
            </NavLink>
            <NavLink
              to="/restaurant"
              className={({ isActive }) =>
                `block py-2 px-1 ${
                  isActive ? "text-lime-500 font-semibold" : "text-gray-700 dark:text-gray-300"
                } hover:text-lime-500`
              }
              onClick={() => setMenuOpen(false)}
            >
              Restaurant
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block py-2 px-1 ${
                  isActive ? "text-lime-500 font-semibold" : "text-gray-700 dark:text-gray-300"
                } hover:text-lime-500`
              }
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </NavLink>
              <hr className="text-gray-700 dark:text-gray-300 " />
          </nav>
          <div className="border-t border-gray-200 dark:border-gray-700">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-1">
                <NavLink
                  to="/wishlist"
                  className="block w-full px-4 py-2 text-center text-base font-medium text-white bg-lime-600 rounded-md hover:bg-lime-700 "
                  onClick={() => setMenuOpen(false)}
                >
                  Wishlist
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <NavLink
                  to="/login"
                  className="block w-full px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-lime-500 rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="block w-full px-4 py-2 text-center text-base font-medium text-white bg-lime-600 rounded-md hover:bg-lime-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
