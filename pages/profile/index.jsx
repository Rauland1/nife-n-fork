import Link from "next/link";
import Head from "next/head";
import Reviews from "../../src/components/Reviews";
import styles from "../../styles/Profile.module.scss";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";

function Profile() {
  const { user, isLoading } = useUser();

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
        {user && !isLoading && (
          <>
            <div className={styles.header}>
              <h3>{user?.nickname}&apos;s Profile</h3>
              <button>
                <Link href="/api/auth/logout">
                  <a>Log out</a>
                </Link>
              </button>
            </div>
            <section className={styles.dataSection}>
              <Reviews user={user?.nickname} />
              <div className={styles.favourites}>
                <h4>Favourite Restaurants</h4>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;

export const getServerSideProps = withPageAuthRequired();
