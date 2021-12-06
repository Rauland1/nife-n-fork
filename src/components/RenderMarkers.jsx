import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/router";
import RestaurantCard from "./RestaurantCard";
import CustomPin from "../../public/location-pin.png";
import { Marker, Tooltip, Popup } from "react-leaflet";
import styles from "../../styles/RestaurantsPage.module.scss";

// Define a custom Marker Icon
const customIcon = new Icon({
  iconUrl: CustomPin.src,
  iconRetinaUrl: CustomPin.src,
  iconSize: [30, 39],
  iconAnchor: [15, 39],
  popupAnchor: [0, -25],
  tooltipAnchor: [0, -25],
  className: "customMarker",
});

const RenderMarkers = ({ coords, restaurants }) => {
  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/restaurant/${id}`);
  };

  return (
    <>
      {coords ? (
        <Marker icon={customIcon} position={coords}></Marker>
      ) : (
        <>
          {restaurants.map((restaurant) => {
            return (
              <Marker
                key={restaurant._id}
                icon={customIcon}
                position={restaurant.coords}
                eventHandlers={{
                  click: () => {
                    handleClick(restaurant._id);
                  },
                }}
              >
                <Tooltip>
                  <RestaurantCard restaurant={restaurant} onTooltip={true} />
                </Tooltip>
              </Marker>
            );
          })}
        </>
      )}
    </>
  );
};

export default RenderMarkers;
