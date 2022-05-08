import "./featuredInfo.css";
import { ArrowUpward, DeleteOutline, Edit } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { useNavigate } from "react-router-dom";
export default function FeaturedInfo() {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("currencies")
      .then((res) => {
        setData(res.data);
        setIsFetching(false);
      })
      .catch((e) => {
        setIsFetching(false);
        console.log(e);
      });
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete("currencies/" + id)
      .then((result) => {
        setData(data.filter((item) => item._id !== id));
        setMsg("Currency Deleted Successfully");
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setMsg("Currency Deleting Failed");
        setOpen(true);
      });
  };

  // for the snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="featured">
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
      {!isFetching ? (
        data.map((item) => {
          return (
            <div className="featuredItem" key={item._id}>
              <span className="featuredTitle">{item.Symbol}</span>
              <div className="featuredMoneyContainer">
                <span className="featuredMoney">{item.InitialPrice}</span>
                <span className="featuredMoneyRate">
                  +2.4 <ArrowUpward className="featuredIcon" />
                </span>
              </div>
              <span className="featuredSub">Compared to last month</span>
              <div className="actionButtons">
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={() => {
                    navigate("/update-curreny", {
                      state: {
                        ...item,
                      },
                    });
                  }}
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={() => handleDelete(item._id)}
                >
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ margin: 30, fontSize: 25 }}>Loading...</div>
      )}
    </div>
  );
}
