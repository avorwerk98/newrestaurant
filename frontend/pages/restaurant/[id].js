import { gql, useQuery } from "@apollo/client";
import { centsToDollars } from "@/utils/centsToDollars";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";

import Image from "next/image";
import Loader from '@/components/Loader';

const dishImageMap = {
  1: "arancini.png",
  2: "meatballs.png",
  3: "proscuitto.png",
  4: "italianchop.png",
  5: "sausagepasta.png",
  6: "carbonara.png",
  7: "corn.png",
  8: "guac",
  9: "nachos.png",
  10: "chickenparm.png",
  11: "carnitas.png",
  12: "shrimptaco.png",
  13: "tacosalad.png",
  14: "churros.png",
  15: "wings.png",
  16: "sliders.png",
  17: "kalesalad.png",
  18: "margherita.png",
  19: "sausagepizza.png",
  20: "smash",
  21: "chickensandwich.png",
  22: "cauliflower.png",
  23: "charcuterie.png",
  24: "octopus.png",
  25: "steakfrites.png",
  26: "lobsterroll.png",
  27: "salmon.png",
  28: "pretzels.png",
  29: "steaksalaldsalad.png",
  30: "maplechicken",
  31: "lyon.png",
  32: "ablt.png",
  33: "steaktips.png",
  34: "popcornchicken.png",
  35: "biscuits.png",
  36: "stirfry",
  37: ".png",
  38: "burger.png",
  39: "pulledpork.png",

};

const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      data {
        id
        attributes {
          name
          dishes {
            data {
              id
              attributes {
                name
                description
                priceinCents
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
      }
    }
  }
`;

function DishCard({ data }) {
  const { addItem, setShowCart } = useAppContext();

  function handleAddItem() {
    addItem(data);
    setShowCart(true);
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
          alt=""
        />
        <div className="p-8">
          <div className="group inline-block mb-4" href="#">
            <h3 className="font-heading text-xl text-indigo-900 hover:text-indigo-700  font-black">
              {data.attributes.name}
            </h3>
            <h2>${centsToDollars(data.attributes.priceinCents)}</h2>
          </div>
          <p className="text-sm text-gray-500">
            {data.attributes.description}
          </p>
          <div className="flex flex-wrap md:justify-center -m-2">
            <div className="w-full md:w-auto p-2 my-6">
              <button
                className="block w-full px-12 py-3.5 text-lg text-center text-white font-bold bg-sky-500 hover:bg-emerald-500 focus:ring-4 focus:ring-gray-600 rounded-full"
                onClick={handleAddItem}
              >
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Restaurant() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id },
  });

  if (error) return "Error Loading Dishes";
  if (loading) return <Loader />;
  if (data.restaurant.data.attributes.dishes.data.length) {
    const { restaurant } = data;

    return (
      <div className='py-6'>
        <h1 className="text-4xl font-bold text-green-600">
          {restaurant.data.attributes.name}
        </h1>
        <div className="py-16 px-8 bg-white rounded-3xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap -m-4 mb-6">
              {restaurant.data.attributes.dishes.data.map((res) => {
                return <DishCard key={res.id} data={res} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>No Dishes Found</h1>;
  }
}