import Link from "next/link";
import styles from "../styles/NotFound.module.scss";

const NotFound = () => {
  return (
    <div className="page">
      <Head>
        <title>Nife & Fork - Error</title>
        <meta
          name="description"
          content="Restaurant review application - Error Page"
        />
        <meta property="og:title" content="Nife & Fork - Error" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.notFound}>
        <h1 className={styles.notFoundHeader}>404</h1>
        <div className={styles.notFoundText}>
          The page you're trying to access does not exist!
        </div>
        <Link href="/">
          <a className={styles.link}>&larr; Go Home</a>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
