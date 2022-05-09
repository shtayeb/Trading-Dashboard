import Chart from "../../components/chart/Chart";
import CurrencyCards from "../../components/currencyCards/CurrencyCards";
import "./home.css";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function Home() {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    axios
      .get("user/stats")
      .then((res) => {
        res.data.foreach((item) => {
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], ActiveUser: item.total },
          ]);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [MONTHS]);

  console.log(userStats);
  return (
    <div className="home">
      <CurrencyCards />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
    </div>
  );
}
