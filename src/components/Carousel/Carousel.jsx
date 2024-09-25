import { Carousel } from "react-responsive-carousel";
import img from "./image/data"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import classes from "./carousel.module.css"
const CarouselEffect = () => {
  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicator={false}
        showThumbs={false}
      >
        {img.map((imageItemLink, i) => {
          return <img key={i} src={imageItemLink} />;
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
    </>
  );
};

export default CarouselEffect;
