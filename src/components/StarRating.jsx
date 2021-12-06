import ReactStars from "react-rating-stars-component";
import { MdStar, MdOutlineStarBorder, MdOutlineStarHalf } from "react-icons/md";

const StarRating = ({ edit, value, size, onChange }) => {
  const settings = {
    count: 5,
    edit,
    value,
    size,
    a11y: true,
    color: "white",
    activeColor: "white",
    isHalf: true,
    emptyIcon: <MdOutlineStarBorder />,
    halfIcon: <MdOutlineStarHalf />,
    filledIcon: <MdStar />,
    classNames: "stars",
    onChange,
  };

  return <ReactStars {...settings} />;
};

export default StarRating;
