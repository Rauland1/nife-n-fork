import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { server } from "../../../config/";
import ReviewForm from "../../../src/components/ReviewForm";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";

const RestaurantReview = ({ restaurant }) => {
  const { user } = useUser();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (formData) => {
    const {
      value,
      price,
      atmosphere,
      foodQuality,
      serviceQuality,
      reviewBody,
    } = formData;

    const { data } = await axios.post(`${server}/api/reviews/new`, {
      restaurant,
      value,
      price,
      atmosphere,
      foodQuality,
      serviceQuality,
      reviewBody,
    });

    if (data.success) {
      setSuccess("Review has been created succesfully! Redirecting...");
      setTimeout(() => {
        router.push(`/restaurant/${router.query.id}`);
      }, 1500);
    } else {
      setError("Review could not be created! Please try again later.");
    }
  };

  return (
    <div className="page">
      <Head>
        <title>Review for {restaurant.name} - Nife & Fork</title>
        <meta
          name="description"
          content={`Review for ${restaurant.name} - Nife & Fork`}
        />
        <meta
          property="og:title"
          content={`Review for ${restaurant.name} - Nife & Fork`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container container-padding">
        {user && (
          <>
            <h3>Leave a review for {restaurant.name}</h3>
            <ReviewForm onSubmit={onSubmit} success={success} error={error} />
          </>
        )}
        {!user && <h2>Redirecting to login...</h2>}
      </div>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    try {
      const {
        data: { message: restaurant },
      } = await axios.get(`${server}/api/restaurants/${context.params.id}`);

      return {
        props: { restaurant },
      };
    } catch (error) {
      console.error(error);
      context.res.statusCode = 302;
      context.res.setHeader("Location", `/`);
      return { props: {} };
    }
  },
});

export default RestaurantReview;
