import { styled, Typography, Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const SliderImage = styled("img")({
  height: 150,
});
const BoxContainer = styled(Box)`
  margin: 10px 0px;
  background-color: #fff;
`;
const TitleContainer = styled(Box)`
  padding: 15px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  & > h3 {
    font-size: 25px;
    font-weigth: 600;
  }
  & > p {
    font-size: 14px;
    color: #b2b2b2;
    font-weight: 400;
  }
`;

const Slider = ({ products, title }) => {
  return (
    <BoxContainer>
      <TitleContainer>
        <Typography variant="h3">{title}</Typography>
        <Typography>{title}</Typography>
      </TitleContainer>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        infinite={true}
        // autoPlaySpeed={3000}
        centerMode={true}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {products.map((product) => {
          return <SliderImage src={product.url} alt="banner" />;
        })}
      </Carousel>
    </BoxContainer>
  );
};
export default Slider;
