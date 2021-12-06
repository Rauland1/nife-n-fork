import axios from "axios";
import { server } from "../../config";
import StarRating from "./StarRating";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/ReviewForm.module.scss";
import { MdOutlineCheckCircle, MdErrorOutline } from "react-icons/md";

const ReviewForm = ({ onSubmit, review, success, error }) => {
  const [value, setValue] = useState(review?.ratings.value || 0);
  const [price, setPrice] = useState(review?.ratings.price || 0);
  const [atmosphere, setAtmosphere] = useState(review?.ratings.atmosphere || 0);
  const [foodQuality, setFoodQuality] = useState(
    review?.ratings.foodQuality || 0
  );
  const [serviceQuality, setServiceQuality] = useState(
    review?.ratings.serviceQuality || 0
  );
  const [reviewBody, setBody] = useState(review?.reviewBody || "");
  const [err, setErr] = useState(error || "");
  const [succ, setSucc] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      value,
      price,
      atmosphere,
      foodQuality,
      serviceQuality,
    };

    let submit = false;

    for (const val in data) {
      if (data[val] > 5 || data[val] < 0.5) {
        setErr("Values below 0.5 or over 5 are not allowed!");
        return (submit = false);
      } else {
        submit = true;
      }
    }

    if (!reviewBody.length) {
      setErr("Review message cannot be empty!");
      return (submit = false);
    } else {
      submit = true;
    }

    data["reviewBody"] = reviewBody;

    submit
      ? onSubmit(data)
      : setErr("Form could not be submitted! Try again later.");
  };

  const deleteReview = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${server}/api/reviews/${review._id}`);
      setSucc("Review deleted successfully! Redirecting...");
      setTimeout(() => router.back(), 1500);
    } catch (error) {
      setErr("Review could not be deleted!");
    }
  };

  useEffect(() => {
    if (success || succ) {
      setErr("");
    }
  }, [success, succ]);

  return (
    <div className={styles.formWrapper}>
      <section
        className={styles.messages}
        style={{ display: success || succ || err ? "block" : "none" }}
      >
        {(success || succ) && !err && (
          <>
            <h4>
              <MdOutlineCheckCircle />
              Success
            </h4>
            {success || succ}
          </>
        )}
        {err && (
          <>
            <h4>
              <MdErrorOutline />
              Error
            </h4>
            {err}
          </>
        )}
      </section>
      <form onSubmit={handleSubmit}>
        <h4>Ratings</h4>
        <div className={styles.formItem}>
          <label>Value</label>
          <StarRating size={30} value={value} edit={true} onChange={setValue} />
        </div>
        <div className={styles.formItem}>
          <label>Price</label>
          <StarRating size={30} value={price} edit={true} onChange={setPrice} />
        </div>
        <div className={styles.formItem}>
          <label>Atmosphere</label>
          <StarRating
            size={30}
            value={atmosphere}
            edit={true}
            onChange={setAtmosphere}
          />
        </div>
        <div className={styles.formItem}>
          <label>Food Quality</label>
          <StarRating
            size={30}
            value={foodQuality}
            edit={true}
            onChange={setFoodQuality}
          />
        </div>
        <div className={styles.formItem}>
          <label>Service Quality</label>
          <StarRating
            size={30}
            value={serviceQuality}
            edit={true}
            onChange={setServiceQuality}
          />
        </div>
        <div className={styles.formItem}>
          <label style={{ display: "block" }}>Review</label>
          <textarea
            value={reviewBody}
            rows={15}
            cols={50}
            placeholder="Give readers an insight of your experience"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.formItem}>
          <button style={{ display: "inline-block" }} type="submit">
            Submit
          </button>
          {review && <button onClick={deleteReview}>Delete</button>}
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
