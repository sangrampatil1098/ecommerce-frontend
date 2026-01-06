import React, { useEffect } from "react";
import ProductCard from "../shared/ProductCard";
import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCategories} from "../../store/slices/ProductSlice";
import axiosInstance from "../../api/api";
import { setErrorMessage, setLoader } from "../../store/slices/commonSlice";
import Filter from "./Filter";
import Loader from "../shared/Loader";
import Pagination from "../shared/Pagination";
import useProductFilter from "../../hooks/useProductFilter";

const Products = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.common);
  const { products, categories,pagination } = useSelector((state) => state.products);
  const carts = useSelector((state) =>state.carts);
  console.log("carts", carts);
  const { totalPages} = pagination;
  const dispatch = useDispatch();

  useProductFilter();

  console.log("products", products);

  const fetchCategories = async () => {
    dispatch(setLoader(true));
    try {
      const response = await axiosInstance.get("/api/public/categories");
      console.log("response", response);
      const { content } = response.data;
      dispatch(
        setCategories({
          categories: content,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(setErrorMessage(error?.response?.data?.message));
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
      <Filter categories={categories} />
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <div>
          <div className="flex justify-center items-center h-[200px]">
            <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
            <span className="text-slate-800 text-lg font-medium">
              {errorMessage}
            </span>
          </div>
        </div>
      ) : (
        <div className="min-h-[700px]">
          <div className="pb-6 pt-14 grid xl:grid-cols-4 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
            {products.length > 0 &&
              products.map((item, index) => {
                return <ProductCard key={index} {...item} />;
              })}
          </div>
          <div className="flex items-center justify-center pt-2">
            <Pagination count = {totalPages}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
