import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, IconButton, Snackbar } from "@material-ui/core";
import axios from "axios";

import CloseIcon from "@material-ui/icons/Close";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flex: 4,
    margin: 15,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LayoutTextFields() {
  const classes = useStyles();
  const { state } = useLocation();

  // console.log(state);
  const [data, setData] = useState(state ? state : {});
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleOnChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFetching(true);
    axios
      .post("currencies", data)
      .then((result) => {
        console.log(result);
        setOpen(true);
        setMsg("Currency Added/Updated Successfully");
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
        setMsg("Currency Adding/Updating Failed");
        setIsFetching(false);
      });
  };

  const handleCommaSeparated = (e) => {
    const value = e.target.value;
    // checks that a string only contains numbers and comma
    if (value.match(/^[0-9,.]*$/)) {
      setData((prev) => {
        return { ...prev, [e.target.name]: value };
      });
    }
  };
  // for the snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div style={{ width: "80%" }}>
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
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />

        <form>
          <TextField
            id="outlined-full-width"
            label="Symbol"
            name="Symbol"
            style={{ margin: 8 }}
            placeholder="Placeholder"
            helperText="Symbol is unique to each currency."
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={data.Symbol}
            onChange={handleOnChange}
            required
          />

          <TextField
            label="InitialPrice"
            name="InitialPrice"
            id="outlined-margin-normal"
            className={classes.textField}
            helperText="ex: 0.00055,0.0066,...."
            margin="normal"
            variant="outlined"
            type="number"
            value={data.InitialPrice}
            onChange={handleOnChange}
            required
          />
          <TextField
            label="AmountSellable"
            name="AmountSellable"
            id="outlined-margin-normal"
            className={classes.textField}
            helperText="ex: 0.00055,0.0066,...."
            margin="normal"
            variant="outlined"
            type="number"
            value={data.AmountSellable}
            onChange={handleOnChange}
            required
          />
          <TextField
            label="DollarsToBuy"
            name="DollarsToBuy"
            id="outlined-margin-normal"
            className={classes.textField}
            helperText="ex: 0.00055,0.0066,...."
            margin="normal"
            variant="outlined"
            type="number"
            value={data.DollarsToBuy}
            onChange={handleOnChange}
            required
          />
          <TextField
            id="outlined-full-width"
            label="PriceToSell"
            name="PriceToSell"
            style={{ margin: 8 }}
            helperText="Seperate the values with comma ex: (0.00055,0.0066,....)"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={data.PriceToSell}
            onChange={handleCommaSeparated}
            required
          />
          <TextField
            id="outlined-full-width"
            label="PriceToBuy"
            name="PriceToBuy"
            style={{ margin: 8 }}
            helperText="Seperate the values with comma ex: (0.00055,0.0066,....)"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={data.PriceToBuy}
            onChange={handleCommaSeparated}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={isFetching}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
