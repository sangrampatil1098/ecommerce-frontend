import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { setErrorMessage, setLoader } from "../store/slices/commonSlice";
import axiosInstance from "../api/api";
import { setProducts } from "../store/slices/ProductSlice";
import { useDispatch } from "react-redux";

const useProductFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams();
    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", currentPage - 1);

    const keyword = searchParams.get("keyword");
    const category = searchParams.get("category");
    const sortOrder = searchParams.get("sortby");
    params.set("sortBy", "price");
    params.set("sortOrder", sortOrder);
    if (keyword) {
      params.set("keyword", keyword);
    }
    if (category) {
      params.set("category", category);
    }
    fetchProducts(params);
  }, [searchParams]);

  const fetchProducts = async (params) => {
    dispatch(setLoader(true));
    try {
      const response = await axiosInstance.get(
        `/api/public/products?${params}`
      );
      console.log("response", response);
      const {
        content,
        pageNumber,
        pageSize,
        totalElements,
        totalPages,
        lastPage,
      } = response.data;
      dispatch(
        setProducts({
          products: content,
          pageNumber,
          pageSize,
          totalElements,
          totalPages,
          lastPage,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(setErrorMessage(error?.response?.data?.message));
    } finally {
      dispatch(setLoader(false));
    }
  };

  return null;
};

export default useProductFilter;
