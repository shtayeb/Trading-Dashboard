// import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import NotFound from "../pages/404/NotFound";
import Home from "../pages/home/Home";
import NewUser from "../pages/newUser/NewUser";
import User from "../pages/user/User";
import UserList from "../pages/userList/UserList";
import AddCurrency from "../pages/AddCurrency";
import TradeLogList from "../pages/tradeLogList/TradeLogList";

const HomeRoutes = () => {
  // const currentUser = useSelector(
  //   (state) => state.persistedReducer.currentUser
  // );
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/add" element={<AddCurrency />} />
          <Route path="/trade-logs" element={<TradeLogList />} />
          <Route path="/update-curreny" element={<AddCurrency />} />
        </Routes>
      </div>
    </>
  );
};

export default HomeRoutes;
