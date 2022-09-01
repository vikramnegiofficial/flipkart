import { Box, styled } from "@mui/material";
import HomeBanner from "./HomeBanner";
import Navbar from "./Navbar";

import { getProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Slider from "./Slider";

const PaddingBox = styled(Box)`
  padding: 18px 10px;
  // background-color: #f1f3f6;
`;

const HomePage = () => {
  const { products } = useSelector((state) => state.getProducts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div style={{ background: "#f1f3f6" }}>
      <Navbar />
      <PaddingBox>
        <HomeBanner />
        <Slider products={products} title="Best of Electronics" />
      </PaddingBox>
    </div>
  );
};

export default HomePage;
