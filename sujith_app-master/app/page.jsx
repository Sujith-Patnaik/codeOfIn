"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import SearchDsiplay from "../components/SearchDisplay";
import Swal from 'sweetalert2';

export default function Home() {
  const [results, setResults] = useState([]);
  const [loc, setLoc] = useState(null);

  function locfun(e) {
    setLoc(e.target.value);
    sessionStorage.setItem("cid", e.target.value);
    setResults([]);
  }

  async function serRes1(e) {
    if (!e.target.value) {
      setResults([]);
    }
    if (!loc || loc === "-10") {
      Swal.fire({
        icon: "error",
        title: "Location not selected",
        text: "Please Enter the Location!",
      });
      setResults([]);
      return;
    }
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ResName: e.target.value,
          Locid: loc
        })
      });
      if (response.ok) {
        const data = await response.json();
        const temp = data.restaurants.slice(0, 10);
        setResults(temp);
      } else {
        console.error("There was an error with the request:", response.statusText);
      }
    } catch (error) {
      console.error("There was an error making the request:", error);
    }
  }

  const renderSearchResults = () => {
    return results.map((res, index) => (
      <SearchDsiplay
        key={index}
        name={res.restaurant.name}
        id={res.restaurant.R.res_id}
        rating={res.restaurant.user_rating.aggregate_rating}
      />
    ));
  };

  return (
    <>
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h4 className="text-sm">Get The App</h4>
          <ul className="flex space-x-6">
            <li className="cursor-pointer hover:text-gray-300 transition-colors">Add Restaurant</li>
            <li className="cursor-pointer hover:text-gray-300 transition-colors">Log in</li>
            <li className="cursor-pointer hover:text-gray-300 transition-colors">Sign up</li>
          </ul>
        </div>
        <div className="bg-gray-800 text-center py-10 px-6">
          <img className="mx-auto mb-4" src="https://b.zmtcdn.com/web_assets/8313a97515fcb0447d2d77c276532a511583262271.png" alt="Logo" />
          <h3 className="text-3xl font-semibold mb-4">Discover the best food & drinks</h3>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <i className="fas fa-location-dot text-xl"></i>
            <select onChange={locfun} value={loc} className="border rounded-lg px-4 py-2 text-gray-900">
            <option value="-10">Select a location</option>
                            <option value="1">Delhi</option>
                            <option value="14">Gurgaon</option>
                            <option value="30">Kolkata</option>
                            <option value="37">Mumbai</option>
                            <option value="94">Bangolore</option>
                            <option value="148">Pune</option>
                            <option value="162">Hyderabad</option>
                            <option value="166">Chennai</option>
                            <option value="184">Lucknow</option>
                            <option value="189">Kochi</option>
                            <option value="191">Varanasi</option>
                            <option value="208">Vizag</option>
                            <option value="214">Vadodara</option>
                            <option value="215">Mangolare</option>
                            <option value="216">Nagpur</option>
            </select>
            <i className="fas fa-search text-xl"></i>
            <input 
              type="text" 
              placeholder="Search for Restaurant, cuisine or a dish" 
              onChange={serRes1} 
              className="border rounded-lg px-4 py-2 text-gray-900"
            />
          </div>
          <div>{renderSearchResults()}</div>
        </div>
        <div className="relative">
          <img className="w-full object-cover" src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png" alt="Header Image" />
        </div>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto px-6 py-10">
  <Link className="bg-white rounded-lg shadow-lg overflow-hidden group" href="/Main">
    <div className="p-4 md:p-6 flex flex-col justify-center items-start">
      <span className="text-lg md:text-xl font-semibold text-blue-500 group-hover:text-blue-700 transition-colors">Order Online</span>
      <p className="text-gray-600 mt-2 text-sm md:text-base group-hover:text-gray-800 transition-colors">Stay home and order to your footsteps</p>
    </div>
    <img className="w-full h-48 object-cover transition-transform duration-300 transform group-hover:scale-105" src="https://b.zmtcdn.com/webFrontend/e5b8785c257af2a7f354f1addaf37e4e1647364814.jpeg?output-format=webp&fit=around|402:360&crop=402:360;" alt="Order Online" />
  </Link>

  <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
    <div className="p-4 md:p-6 flex flex-col justify-center items-start">
      <span className="text-lg md:text-xl font-semibold text-blue-500 group-hover:text-blue-700 transition-colors">Dining</span>
      <p className="text-gray-600 mt-2 text-sm md:text-base group-hover:text-gray-800 transition-colors">View the city's favourite dining venues</p>
    </div>
    <img className="w-full h-48 object-cover transition-transform duration-300 transform group-hover:scale-105" src="https://b.zmtcdn.com/webFrontend/d026b357feb0d63c997549f6398da8cc1647364915.jpeg?output-format=webp&fit=around|402:360&crop=402:360;" alt="Dining" />
  </div>
</section>

      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="flex items-center space-x-4">
              <img src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png?fit=around|198:42&crop=198:42;," alt="Footer Logo" />
              <div className="flex flex-col md:flex-row space-y-2 md:space-x-6">
                <span>India</span>
                <span>English</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              <div>
                <h4 className="font-semibold">About Zomato</h4>
                <a href="#" className="block mt-2 hover:underline">Who we are</a>
                <a href="#" className="block mt-2 hover:underline">Blog</a>
                <a href="#" className="block mt-2 hover:underline">Work with us</a>
                <a href="#" className="block mt-2 hover:underline">Investor relations</a>
                <a href="#" className="block mt-2 hover:underline">Report Fraud</a>
                <a href="#" className="block mt-2 hover:underline">Press kit</a>
                <a href="#" className="block mt-2 hover:underline">Contact us</a>
              </div>
              <div>
                <h4 className="font-semibold">Zomaverse</h4>
                <a href="#" className="block mt-2 hover:underline">Zomato</a>
                <a href="#" className="block mt-2 hover:underline">Blinkit</a>
                <a href="#" className="block mt-2 hover:underline">Feeding India</a>
                <a href="#" className="block mt-2 hover:underline">HyperPure</a>
                <a href="#" className="block mt-2 hover:underline">Zomaland</a>
                <a href="#" className="block mt-2 hover:underline">Weather Land</a>
              </div>
              <div>
                <h4 className="font-semibold">For Restaurants</h4>
                <a href="#" className="block mt-2 hover:underline">Partner with us</a>
                <a href="#" className="block mt-2 hover:underline">Apps for you</a>
              </div>
              <div>
                <h4 className="font-semibold">Learn more</h4>
                <a href="#" className="block mt-2 hover:underline">Privacy</a>
                <a href="#" className="block mt-2 hover:underline">Security</a>
                <a href="#" className="block mt-2 hover:underline">Terms</a>
              </div>
            </div>
          </div>
          <hr className="border-gray-700" />
          <p className="text-center text-sm mt-4">
            By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2024 © Zomato™ Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
