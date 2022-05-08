import "../userList/userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";

export default function TradeLogList() {
  const [data, setData] = useState([]);

  const [Symbol, setSymbol] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getAllLogs();
    return () => {
      setData([]);
    };
  }, []);

  const getAllLogs = () => {
    setIsFetching(true);
    axios
      .get("trade")
      .then((res) => {
        setData(res.data);
        setIsFetching(false);
      })
      .catch((e) => {
        console.log(e);
        setIsFetching(false);
      });
  };

  const handleSubmit = () => {
    if (!Symbol) {
      getAllLogs();
      return;
    }

    setIsFetching(true);
    axios
      .get("trade/log?to=" + to + "&from=" + from + "&Symbol=" + Symbol)
      .then((result) => {
        setIsFetching(false);
        setData(result.data);
        console.log(result);
      })
      .catch((err) => {
        setIsFetching(false);
        console.log(err);
      });
  };

  const columns = [
    {
      field: "Symbol",
      headerName: "Symbol",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.Symbol}</div>;
      },
    },
    { field: "Price", headerName: "Price", width: 200 },
    {
      field: "Op",
      headerName: "Op",
      width: 120,
    },
    {
      field: "createdAt",
      headerName: "Traded At",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {new Date(params.row.createdAt).toLocaleDateString()}
          </div>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <div className="searchFields">
        <TextField
          id="outlined-full-width"
          label="Symbol"
          name="Symbol"
          style={{ margin: 8 }}
          placeholder="Symbol"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e) => setSymbol(e.target.value)}
        />
        <TextField
          id="outlined-full-width"
          label="From"
          name="from"
          style={{ margin: 8 }}
          placeholder="From"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e) => setFrom(e.target.value)}
        />
        <TextField
          id="outlined-full-width"
          label="To"
          name="to"
          style={{ margin: 8 }}
          placeholder="To"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e) => setTo(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isFetching}
        >
          Submit
        </Button>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={8}

        // checkboxSelection
      />
    </div>
  );
}
