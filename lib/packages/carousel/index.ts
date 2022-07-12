import Carousel from "./src/carousel.vue";
import CarouselItem from "./src/carousel-item.vue";

import { withInstall } from "../../utils";

const mCarousel = withInstall(Carousel, "mCarousel");
const mCarouselItem = withInstall(CarouselItem, "mCarouselItem");

export {
  mCarousel,
  mCarouselItem
}
