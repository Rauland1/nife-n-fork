import Link from "next/link";
import Image from "next/image";
import StarRating from "./StarRating";
import styles from "../../styles/RestaurantsPage.module.scss";

const RestaurantCard = ({ restaurant, onTooltip }) => {
  return (
    <Link href={`restaurant/${restaurant._id}`}>
      <div className={onTooltip ? styles.tooltipWrapper : styles.cardWrapper}>
        <Image
          src={restaurant.images[2]}
          layout="fixed"
          width={onTooltip ? 100 : 150}
          height={onTooltip ? 100 : 150}
          objectFit="cover"
          objectPosition="center"
          alt="Hero Image"
          priority
        />
        <div className={styles.data}>
          <span className={styles.title}>{restaurant?.name}</span>
          <div className={styles.stars}>
            <StarRating
              edit={false}
              size={onTooltip ? 17 : 20}
              value={restaurant?.rating}
            />
            <span className={styles.count}>{restaurant?.count}</span>
          </div>
          <div className={styles.tags}>
            {restaurant?.price} <span>&#183;</span>
            {restaurant?.tags && (
              <>
                {restaurant?.tags
                  .filter((tag, index) => index < 2)
                  .join(", ")
                  .replace(/([A-Z])/g, " $1")
                  .trim()
                  .split("")}
              </>
            )}
          </div>
          <div className={styles.address}>{restaurant.address?.street}</div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
