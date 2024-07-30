'use client'
import React, { useState } from 'react'
import SearchDsiplay from "../../components/SearchDisplay"
import Swal from 'sweetalert2'
import Link from 'next/link'

export default function Page() {
    const [results, setResults] = useState([]);
    const [loc, setLoc] = useState(null);
    const [sug, setSug] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const renderSearchResults = () => {
        try {
            return results.map((res, index) => (
                <SearchDsiplay
                    key={index}
                    name={res.restaurant.name}
                    id={res.restaurant.R.res_id}
                    rating={res.restaurant.user_rating.aggregate_rating}
                />
            ));
        } catch (error) {
            console.error("Error rendering search results:", error);
            return <div>Error loading search results.</div>;
        }
    };

    async function locfun(e) {
        setLoc(e.target.value)
        if (e.target.value == "-10") {
            setSug(false)
            return;
        }
        setResults([])
        try {
            const response = await fetch('/api/sugapi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Locid: e.target.value
                })
            });
            if (response.ok) {
                const data = await response.json();
                let temp = [];
                for (let i = 0; i < 3; i++) {
                    temp.push(data.restaurants[i]);
                }
                setSug(temp);
            } else {
                console.error("There was an error with the request:", response.statusText);
            }
        } catch (error) {
            console.error("There was an error making the request:", error);
        }
    }

    async function serRes1(e) {
        setIsLoading(true)
        if (!loc || loc == "-10") {
            Swal.fire({
                icon: "error",
                title: "Location Error",
                text: "Please Enter the Location!"
            });
            setResults([])
            setIsLoading(false)
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
                let temp = []
                for (let i = 0; i < 10; i++) {
                    temp.push(data.restaurants[i]);
                }
                setResults(temp);
            } else {
                console.error("There was an error with the request:", response.statusText);
            }
        } catch (error) {
            console.error("There was an error making the request:", error);
        }
        setIsLoading(false)
    }

    return (
        <>
            <header className="bg-white shadow-md">
                <nav className="flex items-center justify-between p-4 bg-gray-100">
                    <img src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" alt="Logo" className="h-10" />
                    <div className="flex items-center space-x-4">
                        <i className="fa-solid fa-location-dot text-gray-600"></i>
                        <select onChange={locfun} value={loc} className="border border-gray-300 rounded-md p-2">
                            <option value="-10">Select a location</option>
                            <option value="1">Delhi</option>
                            <option value="14">Vizag</option>
                            <option value="30">Kolkata</option>
                            <option value="37">Mumbai</option>
                            <option value="94">Bangolore</option>
                            <option value="148">Pune</option>
                            <option value="162">Hyderabad</option>
                            <option value="166">Chennai</option>
                            <option value="184">Lucknow</option>
                            <option value="189">Kochi</option>
                            <option value="191">Varanasi</option>
                            <option value="208">Goa</option>
                            <option value="214">Vadodara</option>
                            <option value="215">Mangolare</option>
                            <option value="216">Nagpur</option>
                        </select>
                        <i className="fa-solid fa-magnifying-glass text-gray-600"></i>
                        <input
                            type="text"
                            placeholder="Search for Restaurant, cuisine or a dish"
                            onChange={serRes1}
                            className="border border-gray-300 rounded-md p-2 text-black"
                        />
                    </div>
                </nav>
                <nav className="flex justify-around bg-gray-200 p-4">
                    <div className="text-center">
                        <img src="https://b.zmtcdn.com/data/o2_assets/78d25215ff4c1299578ed36eefd5f39d1616149985.png?output-format=webp" className="w-12 h-12 mx-auto" alt="Dining Out" />
                        <a href="#" className="block text-gray-700">Dining Out</a>
                    </div>
                    <div className="text-center">
                        <img src="https://b.zmtcdn.com/data/o2_assets/246bbd71fbba420d5996452be3024d351616150055.png" className="w-12 h-12 mx-auto" alt="Delivery" />
                        <a href="#" className="block text-blue-600">Delivery</a>
                    </div>
                    <div className="text-center">
                        <img src="https://b.zmtcdn.com/data/o2_assets/01040767e4943c398e38e3592bb1ba8a1616150142.png" className="w-12 h-12 mx-auto" alt="Nightlife" />
                        <a href="#" className="block text-gray-700">Nightlife</a>
                    </div>
                </nav>
            </header>

            <nav className="border-t border-gray-200"></nav>

            <section className="p-4 bg-white">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Filters</h2>
                    <button className="text-blue-600">Filters</button>
                </div>
                <div className="flex flex-wrap space-x-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Rating: 4.0+</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Pure Veg</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Cuisines</button>
                </div>
            </section>

            <section className="p-4 bg-white">
                <h2 className="text-2xl font-semibold mb-4">Inspiration for your first order</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center">
                        <img src="https://b.zmtcdn.com/data/o2_assets/37df381734b24f138af4a84fd7e4d4ec1716558578.jpeg" className="w-32 h-32 object-cover rounded-md" alt="Biryani" />
                        <p className="mt-2">Biryani</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png" className="w-32 h-32 object-cover rounded-md" alt="Chicken" />
                        <p className="mt-2">Chicken</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png" className="w-32 h-32 object-cover rounded-md" alt="Pizza" />
                        <p className="mt-2">Pizza</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="https://b.zmtcdn.com/data/o2_assets/e444ade83eb22360b6ca79e6e777955f1632716661.png" className="w-32 h-32 object-cover rounded-md" alt="Fried Rice" />
                        <p className="mt-2">Fried Rice</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="https://b.zmtcdn.com/data/o2_assets/8dc39742916ddc369ebeb91928391b931632716660.png" className="w-32 h-32 object-cover rounded-md" alt="Dosa" />
                        <p className="mt-2">Dosa</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png" className="w-32 h-32 object-cover rounded-md" alt="Burger" />
                        <p className="mt-2">Burger</p>
                    </div>
                </div>
            </section>

            {results.length > 0 ? (
                <section className="p-4 bg-white">
                    <h2 className="text-2xl font-semibold mb-4">Food delivery Restaurants</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {results.map((res, index) => (
                            <Link key={index} href={`res/${res?.restaurant?.R?.res_id || 308322}`} className="block bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                                <img
                                    src={res.restaurant.thumb || "https://www.shutterstock.com/shutterstock/photos/2155242945/display_1500/stock-vector-image-coming-soon-no-photo-no-thumbnail-image-available-missing-picture-icon-vector-illustration-2155242945.jpg"}
                                    className="w-full h-32 object-cover"
                                    alt={res.restaurant.name || "Restaurant"}
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{res.restaurant.name || "Restaurant Name"}</h3>
                                    <p className="text-gray-600">ID: {res.restaurant.R.res_id || "N/A"}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            ) : (
                <section className="p-4 bg-white text-center">
                    <h2 className="text-2xl font-semibold mb-4">Food delivery Restaurants</h2>
                    <p>Select The Location</p>
                </section>
            )}

            {isLoading && (
                <section className="p-4 bg-white">
                    <div className="max-w-sm mx-auto p-4 border border-gray-200 rounded-lg shadow-md animate-pulse">
                        <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-lg"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full mb-4 w-3/4"></div>
                        <div className="h-2 bg-gray-300 rounded-full mb-2.5 w-1/2"></div>
                        <div className="h-2 bg-gray-300 rounded-full mb-2.5 w-1/2"></div>
                        <div className="h-2 bg-gray-300 rounded-full w-1/2"></div>
                    </div>
                </section>
            )}
        </>
    )
}
