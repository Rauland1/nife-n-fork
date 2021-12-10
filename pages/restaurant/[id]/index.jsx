import axios from "axios";
import Head from "next/head";
import { server } from "../../../config";
import { useUser } from "@auth0/nextjs-auth0";
import { MdLocationPin } from "react-icons/md";
import Reviews from "../../../src/components/Reviews";
import Gallery from "../../../src/components/Gallery";
import StarRating from "../../../src/components/StarRating";
import styles from "../../../styles/Restaurant.module.scss";

import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(
  () => import("../../../src/components/MapComponent"),
  {
    ssr: false,
  }
);

const Restaurant = ({ restaurant }) => {
  const { user } = useUser();
  const addFavourite = async () => {
    if (!user) return console.log("Gotta log in first lmao xD");

    const { data } = await axios.post(`${server}/api/restaurants/favourite`, {
      restaurantId: restaurant._id,
      restaurantName: restaurant.name,
    });

    if (data.success) {
      // USE MESSAGE FOR MODAL
      console.log(data.message);
    } else {
      console.error("Could not complete action.");
    }
  };

  return (
    <div className="page">
      <Head>
        <title>{restaurant.name} - Nife & Fork</title>
        <meta name="description" content={`${restaurant.name} - Nife & Fork`} />
        <meta
          property="og:title"
          content={`${restaurant.name} - Nife & Fork`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container container-padding">
        <h1 className={styles.title}>
          {restaurant.name}{" "}
          <button onClick={addFavourite}>Add to favourites</button>
        </h1>
        <div className={styles.ratingData}>
          <StarRating size={30} edit={false} value={restaurant.rating} />{" "}
          <span>{restaurant?.count} reviews</span>
        </div>
        <div className={styles.tags}>
          {restaurant?.price} <span>&#183;</span>
          {restaurant?.tags && (
            <>
              {restaurant?.tags
                .filter((tag, index) => index < 3)
                .join(", ")
                .replace(/([A-Z])/g, " $1")
                .trim()
                .split("")}
            </>
          )}
        </div>
        <div className={styles.photos}>
          <Gallery imageArray={restaurant.images} />
        </div>
        <hr className={styles.divider} />
        <section className={styles.details}>
          <div className={styles.detail}>
            <h4>Description</h4>
            <p>{restaurant.desc}</p>
          </div>
          <div className={styles.detail}>
            <h4>Location</h4>
            <MapWithNoSSR
              coords={restaurant.coords}
              drag={false}
              zoom={false}
            />
            {restaurant?.address && (
              <div className={styles.address}>
                <MdLocationPin />
                <span>
                  {restaurant.address?.street}, {restaurant.address?.city}
                </span>
              </div>
            )}
          </div>
        </section>
        <hr className={styles.divider} />
        <Reviews restaurant={restaurant} />
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const {
      data: { message: restaurant },
    } = await axios.get(`${server}/api/restaurants/${context.params.id}`);

    return {
      props: { restaurant },
    };
  } catch (error) {
    console.error(error);
    context.res.statusCode = 404;
    context.res.setHeader("Location", `/`);
    return { props: {} };
  }
};

export default Restaurant;
