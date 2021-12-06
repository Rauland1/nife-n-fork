import axios from "axios";
import ReviewCard from "./ReviewCard";
import { server } from "../../config";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import styles from "../../styles/Review.module.scss";

const Reviews = ({ restaurant, user }) => {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const { data } = await axios.get(
        user
          ? `${server}/api/users/${user}`
          : `${server}/api/allreviews?id=${restaurant._id}`
      );

      setReviews(data.message);
    }

    fetchReviews();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/restaurant/${restaurant._id}/review`);
  };

  return (
    <section className={styles.reviews}>
      <div className={styles.reviewsHeader}>
        <h4>Reviews</h4>
        {restaurant && <button onClick={handleClick}>Leave a review</button>}
      </div>

      {reviews.length ? (
        reviews.map((review) => {
          return <ReviewCard review={review} key={review._id} />;
        })
      ) : (
        <>
          {restaurant && (
            <span>
              There are no reviews for {restaurant.name}. Why don&apos;t you
              leave one?
            </span>
          )}

          {user && <span>{user} did not leave any reviews yet.</span>}
        </>
      )}
    </section>
  );
};

export default Reviews;
