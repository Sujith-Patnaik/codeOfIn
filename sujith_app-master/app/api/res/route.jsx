import { NextResponse } from "next/server";
import data from "../../../datasets/file1.json";
import data1 from "../../../datasets/file2.json";
import data2 from "../../../datasets/file3.json";
import data3 from "../../../datasets/file4.json";
import data4 from "../../../datasets/file5.json";

export async function POST(request) {
    try {
        // Parse the request body to get the ResId
        const dat = [...data, ...data1, ...data2, ...data3, ...data4];
        var { Resid } = await request.json();
        Resid = parseInt(Resid);
        console.log("Resid received:", Resid, typeof(Resid));

        // Collect all matching restaurants
        let foundRestaurants = [];
        for (const item of dat) {
            // Check if the item has a 'restaurants' property and it is an array
            if (Array.isArray(item.restaurants)) {
                // Filter to get all restaurants with the matching ResId
                const matches = item.restaurants.filter(
                    restaurant => restaurant.restaurant.R.res_id === Resid
                );
                // Add found restaurants to the result array
                foundRestaurants = [...foundRestaurants, ...matches];
            }
        }

        // If no restaurants are found, return a 404 error
        if (foundRestaurants.length === 0) {
            return NextResponse.json({ error: `Restaurant with ID ${Resid} not found.` }, { status: 404 });
        }

        // Return the found restaurants
        return NextResponse.json({ restaurants: foundRestaurants });
    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
