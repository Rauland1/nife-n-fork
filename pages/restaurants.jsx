import axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { server } from "../config";
import styles from "../styles/RestaurantsPage.module.scss";
import RestaurantList from "../src/components/RestaurantList";

const MapWithNoSSR = dynamic(() => import("../src/components/MapComponent"), {
  ssr: false,
});

function Restaurants({ data }) {
  const [map, setMap] = useState(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, []);

  return (
    <div className="page" style={{ paddingTop: "0" }}>
      <Head>
        <title>Nife & Fork - Restaurants</title>
        <meta
          name="description"
          content="Restaurant review application - List of restaurants"
        />
        <meta property="og:title" content="Nife & Fork - Restaurants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container container-padding">
        <div className={styles.wrapper}>
          <RestaurantList restaurants={data} />
          {show && (
            <MapWithNoSSR
              setMap={setMap}
              drag={true}
              zoom={true}
              restaurants={data}
              zoomLvl={15}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    const {
      data: { message: data },
    } = await axios.get(`${server}/api/search?q=`);

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error(error);
    context.res.statusCode = 404;
    context.res.setHeader("Location", `/`);
    return { props: {} };
  }
};

export default Restaurants;
