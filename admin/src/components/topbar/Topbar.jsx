import React from "react";
import "./topbar.css";
import { Menu } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userRedux";

export default function Topbar() {
  const user = useSelector((state) => state.persistedReducer.currentUser);
  const dispatch = useDispatch();
  const handleMenu = () => {};
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <div className="hamburger">
            <Menu className="menu-icon" onClick={handleMenu} />
          </div>
          <span className="logo">C.Trading</span>
        </div>
        <div className="topRight">
          {user ? (
            <div className="topbarIconContainer" onClick={handleLogout}>
              LOGOUT
            </div>
          ) : (
            <div className="topbarIconContainer">LOGIN</div>
          )}
          <img src={user?.img} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
