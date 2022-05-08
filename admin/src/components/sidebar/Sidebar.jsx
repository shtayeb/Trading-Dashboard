import "./sidebar.css";
import {
  Add,
  LineStyle,
  NoteAddOutlined,
  PermIdentity,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/trade-logs" className="link">
              <li className="sidebarListItem">
                <NoteAddOutlined className="sidebarIcon" />
                Trade Logs
              </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/add" className="link">
              <li className="sidebarListItem">
                <Add className="sidebarIcon" />
                Add Currency
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
