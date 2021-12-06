import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import StarRating from "./StarRating";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../styles/Suggestions.module.scss";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={styles.next}
      onClick={onClick}
      style={{ display: onClick === null ? "none" : "flex" }}
    >
      <MdArrowForward />
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={styles.prev}
      onClick={onClick}
      style={{ display: onClick === null ? "none" : "flex" }}
    >
      <MdArrowBack />
    </div>
  );
}

const Suggestion = ({ header, subtitle, suggestions }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          arrows: true,
          dots: false,
          rows: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          arrows: false,
          dots: false,
          infinite: true,
          rows: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.suggestions}>
      <div className={styles.suggestionTitle}>{header}</div>
      <div className={styles.suggestionSubtitle}>{subtitle}</div>

      <Slider {...settings}>
        {suggestions.length > 0 &&
          suggestions.map((suggestion) => {
            return (
              <Link
                href="/restaurant/[id]"
                as={`/restaurant/${suggestion._id}`}
                key={suggestion._id}
              >
                <div className={styles.suggestion}>
                  <Image
                    src={suggestion.images[0]}
                    alt={"Restaurant Picture"}
                    width={200}
                    height={200}
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="center"
                    priority
                  />
                  <div className={styles.restaurantData}>
                    <div className={styles.restaurantName}>
                      {suggestion?.name}
                    </div>
                    <div className={styles.rating}>
                      <StarRating
                        edit={false}
                        value={suggestion?.rating}
                        size={20}
                      />
                      <span className={styles.count}>
                        {suggestion?.count} reviews
                      </span>
                    </div>
                    <div className="data">
                      {suggestion?.price || "$$"} <span>&#183;</span>{" "}
                      {suggestion?.tags[0] || ""}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </Slider>
    </div>
  );
};

export default Suggestion;
