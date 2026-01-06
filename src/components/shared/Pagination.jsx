import { Pagination } from "@mui/material";
import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Paginations = ({ count }) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams)
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const handlePageChange = (event, value) => {

    params.set("page",value)
    navigate(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      count={count}
      page={currentPage}
      siblingCount={1}
      shape="rounded"
      onChange={handlePageChange}
    />
  );
};

export default Paginations;
