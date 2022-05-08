import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Person } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("user/?new=true")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Members</span>
      <ul className="widgetSmList">
        {users?.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            {user.img ? (
              <img src={user.img || ""} alt="" className="widgetSmImg" />
            ) : (
              <Person />
            )}
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">{user.name}</span>
            </div>
            <Link to={`/user/${user._id}`}>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
