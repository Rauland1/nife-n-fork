import RestaurantCard from "./RestaurantCard";
import styles from "../../styles/RestaurantsPage.module.scss";

const RestaurantList = ({ restaurants }) => {
  return (
    <div className={styles.list}>
      <h3 className={styles.title}>Cluj-Napoca Restaurants</h3>
      {restaurants.length &&
        restaurants.map((restaurant) => {
          return (
            <RestaurantCard restaurant={restaurant} key={restaurant._id} />
          );
        })}
    </div>
  );
};

export default RestaurantList;
