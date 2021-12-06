import Link from "next/link";
import { useState } from "react";
import StarRating from "./StarRating";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { MdFace, MdMoreHoriz } from "react-icons/md";
import styles from "../../styles/Review.module.scss";

const ReviewCard = ({ review }) => {
  const router = useRouter();
  const { user } = useUser();
  const [show, setShow] = useState(false);

  return (
    <div className={styles.reviewCard}>
      <div className={styles.profileSection}>
        {(router.pathname !== "/profile/[username]" ||
          router.pathname !== "/profile") && (
          <Link href={`/profile/${review.user.username}`}>
            <div className={styles.reviewProfile}>
              <MdFace size={48} />
              {review.user.username}
            </div>
          </Link>
        )}
        {user?.sub === review.user.user_id && (
          <div style={{ position: "relative" }}>
            <button
              className={styles.more}
              onClick={() => {
                setShow(!show);
              }}
            >
              <MdMoreHoriz />
            </button>
            <ul
              className={styles.hiddenMenu}
              style={{ display: show ? "flex" : "none" }}
            >
              <Link href={`/review/${review._id}`}>
                <li>Edit</li>
              </Link>
              <Link href={`/review/${review._id}`}>
                <li>Delete</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
      <div className={styles.reviewData}>
        <StarRating
          edit={false}
          value={review.ratings?.overallRating}
          size={22.5}
        />
        <span>{new Date(review.added).toLocaleDateString("en-GB")}</span>
      </div>
      <div className={styles.reviewBody}>{review.reviewBody}</div>
    </div>
  );
};

export default ReviewCard;
