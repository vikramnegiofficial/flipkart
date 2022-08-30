import {styled} from'@mui/material';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from '../../data/NavbarData';

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const BannerImg = styled("img")({
    width : "100%",
    height : 280,
})


const HomeBanner = ()=>{
    return(
        <Carousel
  swipeable={false}
  draggable={false}
  showDots={false}
  responsive={responsive}
  infinite={true}
  autoPlaySpeed={3000}

  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>
  {
    bannerData.map((data)=>{
        return <BannerImg src={data.url} alt="banner"/>
    })
  }
</Carousel>

    );
}
export default HomeBanner;