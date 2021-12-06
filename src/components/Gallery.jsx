import ImageGallery from "react-image-gallery";

const Gallery = ({ imageArray }) => {
  const images = imageArray?.map((image) => {
    return {
      original: image,
      originalAlt: "Food Picture",
      thumbnailAlt: "Food Picture",
      originalClass: "galleryImage",
    };
  });

  return (
    <ImageGallery
      items={images}
      showFullscreenButton={false}
      showPlayButton={false}
      showThumbnails={false}
    />
  );
};

export default Gallery;
