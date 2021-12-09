import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { server } from "../../config";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Reviews from "../../src/components/Reviews";
import styles from "../../styles/Profile.module.scss";

function Profile() {
  const router = useRouter();
  const { username } = router.query;
  const { user } = useUser();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // Create user data if it doesn't exist
    async function createUser() {
      try {
        if (user) {
          const { data } = await axios.post(`${server}/api/users`, {
            username: username,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Fetch user data
    async function fetchFavourites() {
      try {
        const { data } = await axios.get(`${server}/api/users/${username}`);
        setFavourites([...data.favourites]);
      } catch (error) {
        console.error("Could not fetch data.");
      }
    }

    if (username === user?.nickname) createUser();
    fetchFavourites();
  }, [user]);

  return (
    <div className="page">
      <Head>
        <title>Nife & Fork - Profile</title>
        <meta
          name="description"
          content="Restaurant review application - Profile"
        />
        <meta property="og:title" content="Nife & Fork - Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container container-padding">
        <>
          <div className={styles.header}>
            <h3>{username}&apos;s Profile</h3>
            {user?.nickname === username && (
              <button>
                <Link href="/api/auth/logout">
                  <a>Log out</a>
                </Link>
              </button>
            )}
          </div>
          <section className={styles.dataSection}>
            {username && <Reviews username={username} />}
            <div className={styles.favourites}>
              <h4>Favourite Restaurants</h4>
              {favourites?.length ? (
                favourites.map((favourite) => {
                  return (
                    <div
                      key={favourite.restaurant_id}
                      className={styles.favourite}
                    >
                      <Link href={`/restaurant/${favourite.restaurant_id}`}>
                        {favourite.name}
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div>So lonely...</div>
              )}
            </div>
          </section>
        </>
      </div>
    </div>
  );
}

export default Profile;
