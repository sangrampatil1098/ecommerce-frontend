import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaSearch } from "react-icons/fa";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useProductFilter from "../../hooks/useProductFilter";

const Filter = ({categories}) => {
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  useProductFilter();

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  console.log("pathname", pathname);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
      params.set("page",1)
    }
    navigate(`${pathname}?${params}`);
    setCategory(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => {
      const newOrder = prev === "asc" ? "desc" : "asc";
      params.set("sortby", newOrder);
      navigate(`${pathname}?${params}`);
      return newOrder;
    });
  };

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentsortOrder = searchParams.get("sortby") || "asc";
    const currentSeachTerm = searchParams.get("keyword") || "";

    setCategory(currentCategory);
    setSortOrder(currentsortOrder);
    setSearchTerm(currentSeachTerm);
  }, [searchParams]);

  const handleClearFilters = () => {
    navigate({ pathname: window.location.pathname });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        searchParams.set("keyword", searchTerm);
      } else {
        searchParams.delete("keyword");
      }
      navigate(`${pathname}?${searchParams.toString()}`);
    }, 700);
    return () => {
      clearTimeout(handler);
    };
  }, [searchParams, searchTerm, navigate, pathname]);

  return (
    <div className="flex lg:flex-row flex-col-reverse items-center lg:justify-between justify-center gap-4">
      <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
        <input
          type="text"
          placeholder="search"
          className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus-ring-[#1976d2]"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <FaSearch className="absolute left-3 text-slate-800 size={20}" />
      </div>
      <div className="flex sm:flex-row flex-col gap-4 items-center">
        <FormControl
          className="text-salte-800 border border-slate-700"
          variant="outlined"
          size="small"
        >
          <InputLabel id="category-select-lable">Category</InputLabel>
          <Select
            labelId="category-select-lable"
            value={category}
            onChange={handleChange}
            label="category"
            className="min-w-[120px] text-slate-800 "
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((item, index) => (
              <MenuItem value={item.categoryName} key={item.categoryId}>
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip title="sorted by price: asc">
          <Button
            variant="contained"
            color="primary"
            className="flex items-center gap-2 h-10"
            onClick={toggleSortOrder}
          >
            Sort By
            {sortOrder === "asc" ? (
              <FaArrowUp size={20} />
            ) : (
              <FaArrowDown size={20} />
            )}
          </Button>
        </Tooltip>
        <button
          onClick={handleClearFilters}
          className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none"
        >
          <RefreshIcon className="font-semibold" size={16} />
          <span className="font-semibold">Clear Filter</span>
        </button>
      </div>
    </div>
  );
};

export default Filter;
