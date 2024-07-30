'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaStar, FaRegClock, FaRupeeSign, FaMapMarkerAlt } from 'react-icons/fa'

export default function Page({ params }) {
  const [result, setResults] = useState(null);
  const { id } = params;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/res', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ Resid: id })
        });
        if (response.ok) {
          const data = await response.json();
          setResults(data.restaurants);
        } else {
          console.error("Request error:", response.statusText);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      {result ? (
        <>
          <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
            <nav className="flex items-center justify-between container mx-auto px-4 py-3">
              <img src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" alt="Zomato Logo" className="w-32 h-auto" />
              <div className="flex space-x-4">
                <a href="#" className="text-gray-700 hover:text-red-500">Order Online</a>
                <a href="#" className="text-gray-700 hover:text-red-500">Reviews</a>
                <a href="#" className="text-gray-700 hover:text-red-500">Photos</a>
              </div>
            </nav>
          </header>

          <div className="mt-16 relative">
            <img src={result[0].restaurant.featured_image || 'https://via.placeholder.com/1200x400'} alt="Restaurant Cover" className="w-full h-64 object-cover" />
            <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
              {result[0].restaurant.cuisines}
            </div>
          </div>

          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-start">
              <div className="w-2/3 pr-8">
                <h1 className="text-3xl font-bold mb-2">{result[0].restaurant.name}</h1>
                <p className="text-lg text-gray-700 mb-4">{result[0].restaurant.location.address}</p>
                
                <div className="flex space-x-6 mb-6">
                  <div className="bg-green-100 p-3 rounded-lg text-center">
                    <span className="text-2xl font-semibold text-green-700">{result[0].restaurant.user_rating.aggregate_rating}</span>
                    <FaStar className="inline-block ml-1 text-green-700" />
                    <p className="text-sm text-gray-600">{result[0].restaurant.user_rating.votes} reviews</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <span className="text-2xl font-semibold">₹{result[0].restaurant.average_cost_for_two}</span>
                    <p className="text-sm text-gray-600">Cost for two</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Menu</h2>
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <img src="https://b.zmtcdn.com/data/dish_photos/27e/2aca6f5d2e1f336cf94b6612bc59a27e.jpeg?fit=around|130:130&crop=130:130;" alt="Prawns Biryani" className="w-full h-48 object-cover rounded-lg mb-3" />
                    <h3 className="text-lg font-semibold">Prawns Biryani</h3>
                    <p className="text-gray-600 mb-2">Richly flavored aromatic rice layered with succulent prawns in a delicate blend of spices...</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">₹250</span>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Add</button>
                    </div>
                  </div>
                </div>

                <Link href={result[0].restaurant.menu_url}>
                  <button className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 w-full">View Full Menu</button>
                </Link>
              </div>

              <div className="w-1/3">
                <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
                  <h2 className="text-xl font-semibold mb-3">Restaurant Info</h2>
                  <p className="flex items-center mb-2"><FaRegClock className="mr-2" /> {result[0].restaurant.timings}</p>
                  <p className="flex items-center mb-2"><FaRupeeSign className="mr-2" /> {result[0].restaurant.average_cost_for_two} for two</p>
                  <p className="flex items-center"><FaMapMarkerAlt className="mr-2" /> {result[0].restaurant.location.locality}</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-3">Location</h2>
                  <img src="https://via.placeholder.com/300x200?text=Map" alt="Restaurant Location" className="w-full rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="loader">
            <div className="crystal"></div>
            <div className="crystal"></div>
            <div className="crystal"></div>
            <div className="crystal"></div>
            <div className="crystal"></div>
            <div className="crystal"></div>
          </div>
        </div>
      )}
    </>
  )
}