import axios from "axios";
import { useState } from "react";

import "./newUser.css";

export default function NewUser() {
  const [data, setData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const handleOnChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    if (data.name && data.username && data.password && data.email) {
      setIsFetching(true);
      axios
        .post("auth/register", data)
        .then((res) => {
          setError({ type: "success", msg: "User Created Successfully" });
          setIsFetching(false);
          setData({});
        })
        .catch((e) => {
          setIsFetching(false);
          setError({ type: "err", msg: e.message });
          console.log(e);
        });
    } else {
      // setSearchParams({
      //   error: "Dont Leave , name , username , email and password blank.",
      // });
    }
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
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
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="john"
            onChange={handleOnChange}
          />
        </div>
        <div className="newUserItem">
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="John Smith"
            onChange={handleOnChange}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="john@gmail.com"
            onChange={handleOnChange}
          />
        </div>
        <div className="newUserItem">
          <label>Img</label>
          <input
            name="img"
            type="text"
            placeholder="https://yourimg.com/img.jpg"
            onChange={handleOnChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleOnChange}
          />
        </div>
        <button
          className="newUserButton"
          onClick={handleCreate}
          disabled={isFetching}
        >
          Create
        </button>
      </form>
    </div>
  );
}
