import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { server } from "../config";
import heroImage from "../public/hero-img.jpg";
import Searchbar from "../src/components/Searchbar";
import Suggestions from "../src/components/Suggestions";

import styles from "../styles/Home.module.scss";

export default function Home({ data }) {
  return (
    <main className="page">
      <Head>
        <title>Nife & Fork</title>
        <meta name="description" content="Restaurant review application" />
        <meta property="og:title" content="Nife & Fork" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <div className={styles.hero}>
          <div className={styles.heroImageContainer}>
            <Image
              src={heroImage}
              width={600}
              height={400}
              placeholder="blur"
              layout="responsive"
              objectFit="cover"
              objectPosition="center"
              alt="Hero Image"
              priority
            />
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              Feed <span>your</span> appetite
            </div>
            <Searchbar />
          </div>
        </div>

        <Suggestions data={data} />
      </div>
    </main>
  );
}

export const getServerSideProps = async () => {
  const {
    data: { message: data },
  } = await axios.get(`${server}/api/search?q=`);

  return {
    props: {
      data,
    },
  };
};
