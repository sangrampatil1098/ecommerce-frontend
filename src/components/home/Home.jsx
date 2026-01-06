import React from "react";
import HeroBanner from "./HeroBanner";
import { useSelector } from "react-redux";
import ProductCard from "../shared/ProductCard";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";

const Home = () => {
  const { products, categories, pagination } = useSelector(
    (state) => state.products
  );
  const { isLoading, errorMessage } = useSelector((state) => state.common);

  useProductFilter();

  return (
    <div className="lg:px-14 sm:px-8 px-4">
      <div className="py-6">
        <HeroBanner />
      </div>
      <div className="py-5">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-slate-800 text-4xl font-bold"> Products</h1>
          <span className="text-slate-700">
            Discover our handpicker selection of top-rated items just for you!
          </span>
        </div>
        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <div className="flex justify-center items-center h-[200px]">
            <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
            <span className="text-slate-800 text-lg font-medium">
              {errorMessage}
            </span>
          </div>
        ) : (
          <div className="pb-6 pt-14 grid xl:grid-cols-4 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
            {products.length > 0 &&
              products.map((item, index) => {
                return <ProductCard key={index} {...item} />;
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
