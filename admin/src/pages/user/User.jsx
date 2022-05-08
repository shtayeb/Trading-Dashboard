import { CalendarToday, MailOutline, PermIdentity } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./user.css";

export default function User() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [data, setData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("user/find/" + userId)
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    return () => {
      setData([]);
      setUser(null);
      setIsFetching(false);
      setError(null);
    };
  }, [userId]);

  const handleOnChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (data.name || data.username || data.email || data.img) {
      setIsFetching(true);
      axios
        .put(`/user/${user._id}`, data)
        .then((res) => {
          setIsFetching(false);
          setError({
            msg: "Updated",
            type: "success",
          });
          setData({});
        })
        .catch((e) => {
          setIsFetching(false);
          setError({
            msg: e.message,
            type: "err",
          });
        });
    } else {
      setError({
        msg: "Noting to update !!",
        type: "err",
      });
    }
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={user?.img} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user?.name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                {new Date(user?.createdAt).toLocaleString()}
              </span>
            </div>
            <span className="userShowTitle">Contact Details</span>

            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          {error && (
            <div
              style={{
                color: error.type === "err" ? "red" : "green",
                fontStyle: "italic",
              }}
            >
              {error.msg}
            </div>
          )}
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user?.username || "Username"}
                  className="userUpdateInput"
                  onChange={handleOnChange}
                  name="username"
                />
              </div>
              <div className="userUpdateItem">
                <label>Name</label>
                <input
                  type="text"
                  placeholder={user?.name || "Name"}
                  className="userUpdateInput"
                  onChange={handleOnChange}
                  name="name"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user?.email || "Email"}
                  className="userUpdateInput"
                  onChange={handleOnChange}
                  name="email"
                />
              </div>
              <div className="userUpdateItem">
                <label>Img</label>
                <input
                  type="text"
                  placeholder={user?.img || "Image Url(Optional)"}
                  className="userUpdateInput"
                  onChange={handleOnChange}
                  name="img"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <button
                className="userUpdateButton"
                onClick={handleUpdate}
                disabled={isFetching}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
