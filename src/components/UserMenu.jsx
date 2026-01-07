import { Avatar, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Backdrop from "./Backdrop";
import { logOutUser } from "../store/slices/authSlice";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logOutUser({navigate}))
  };

  return (
    <div className="relative z-30">
      <div
        className="sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition-all text-slate-700"
        onClick={handleClick}
      >
        <Avatar alt="menu" src="" />
      </div>
      <Menu
        sx={{ width: "400px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
            sx: {
              width: 160,
            },
          },
        }}
      >
        <Link to={"/"}>
          <MenuItem className="flex gap-3" onClick={handleClose}>
            <FaUser size={20} />
            <span className="font-bold text-[16px] mt-1">{user?.username}</span>
          </MenuItem>
        </Link>

        {/* <Link to={"/profile/orders"}>
          <MenuItem className="flex gap-3" onClick={handleClose}>
            <FaShoppingCart size={20} />
            <span className="font-semibold">Order</span>
          </MenuItem>
        </Link> */}

        <MenuItem className="flex gap-3" onClick={logoutHandler}>
          <div className="font-semibold w-full flex gap-2 items-center bg-button-gradient px-4 py-1 text-white rounded-sm">
            <ImExit size={20} />
            <span className="font-bold text-[16px] mt-1">Logout</span>
          </div>
        </MenuItem>
      </Menu>
      {open && <Backdrop/>}
    </div>
  );
};

export default UserMenu;
