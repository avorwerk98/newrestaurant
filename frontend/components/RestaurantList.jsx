import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

import Loader from "./Loader";

const restaurantImageMap = {
  1: "capo.png",
  2: "lincoln.png",
  3: "loco.png",
  4: "publico.png",
  5: "rosalyons.png",
  6: "hunters.png",
};

const QUERY = gql`
  {
    restaurants {
      data {
        id
        attributes {
          name
          description
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

function RestaurantCard({ data }) {
    if (!data || !data.attributes || !data.attributes.image || !data.attributes.image.data || data.attributes.image.data.length === 0 || !data.attributes.image.data[0] || !data.attributes.image.data[0].attributes || !data.attributes.image.data[0].attributes.url) {
      // If the necessary data is not available, return null or an error message
      return <div>Error: Missing image URL.</div>;
    }
  

    const imageFilename = restaurantImageMap[data.id];
  

    const imageUrl = "/uploads/" + imageFilename;
  
    return (
      <div className="w-full md:w-1/2 lg:w-1/3 p-4">
        <div className="h-full bg-gray-100 rounded-2xl">
          <Image
            className="w-full rounded-2xl"
            height={300}
            width={300}
            src={imageUrl}
            alt={data.attributes.name}
          />
        <div className="p-8">
          <h3 className="mb-3 font-heading text-xl text-indigo-900 hover:text-sky-700 group-hover:underline font-black">
            {data.attributes.name}
          </h3>
          <p className="text-sm text-gray-500">
            {data.attributes.description}
          </p>
          <div className="flex flex-wrap md:justify-center -m-2">
            <div className="w-full md:w-auto p-2 my-6">
              <Link
                className="block w-full px-12 py-3.5 text-lg text-center text-white font-bold bg-sky-500 hover:bg-emerald-500 focus:ring-4 focus:ring-gray-600 rounded-full"
                href={`/restaurant/${data.id}`}
              >
                Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RestaurantList(props) {
    const { loading, error, data } = useQuery(QUERY);
  
    console.log("data:", data); // Add this line to check the fetched data
  
    if (error) return "Error loading restaurants";
    if (loading || !data) return <Loader />; // Add a check for data existence
  
    const restaurantsWithData = data.restaurants?.data?.filter(
      (restaurant) =>
        restaurant.attributes.image?.data?.[0]?.attributes?.url !== undefined
    );
  
    console.log("restaurantsWithData:", restaurantsWithData); // Add this line to check the filtered data
  
    if (restaurantsWithData && restaurantsWithData.length > 0) {
      return (
        <div className="py-16 px-8 bg-white rounded-3xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap -m-4 mb-6">
              {restaurantsWithData.map((res) => (
                <RestaurantCard key={res.id} data={res} />
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>No Restaurants Found</h1>;
    
  }
  
  
    
  return <h5>Add Restaurants</h5>;
}
export default RestaurantList;