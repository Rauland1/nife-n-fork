import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { server } from "../../../config";
import ReviewForm from "../../../src/components/ReviewForm";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";

const Review = ({ review, name }) => {
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

    const { data } = await axios.put(`${server}/api/reviews/${review._id}`, {
      value,
      price,
      atmosphere,
      foodQuality,
      serviceQuality,
      reviewBody,
    });

    if (data.success) {
      setSuccess("Review has been updated succesfully! Redirecting...");
      setTimeout(() => {
        router.back();
      }, 1500);
    } else {
      setError("Review could not be updated! Please try again later.");
    }
  };

  return (
    <div className="page">
      <Head>
        <title>Nife & Fork - New Review</title>
        <meta
          name="description"
          content="Restaurant review application - New Review"
        />
        <meta property="og:title" content="Nife & Fork - New Review" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container container-padding">
        {user && user?.sub === review.user.user_id ? (
          <>
            <h3>Edit your review for {name} </h3>
            <ReviewForm
              review={review}
              onSubmit={onSubmit}
              success={success}
              error={error}
            />
          </>
        ) : (
          <h3>Not authorized to edit review!</h3>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    try {
      const {
        data: { message: review },
      } = await axios.get(`${server}/api/reviews/${context.params.id}`);

      const {
        data: {
          message: { name },
        },
      } = await axios.get(`${server}/api/restaurants/${review.restaurant_id}`);

      return {
        props: {
          review,
          name,
        },
      };
    } catch (error) {
      console.error(error);
      context.res.statusCode = 302;
      context.res.setHeader("Location", `/`);
      return { props: {} };
    }
  },
});

export default Review;
