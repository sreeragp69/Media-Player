import React, { useEffect, useState } from "react";
import { getHistory } from "../services/allapi";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-feather";

function WatchHistory() {
  const [History, setHistory] = useState([]);

  const getWatchHistory = async () => {
    // let response = await getHistory();
    // console.log(response);

    const { data } = await getHistory();
    // console.log(data);

    setHistory(data);
  };
  console.log(History);

  useEffect(() => {
    getWatchHistory();
  }, []);

  return (
    <>
    <div className="d-flex align-items-center justify-content-center ">

      <h1 className="me-5">Watch History</h1>

      <Link  to={'/home'}  style={{textDecoration:"none", fontSize:'20px', color:'rebeccapurple', fontWeight:'bold'}}>
      <span><ArrowLeft/></span> Back
      </Link>
    </div>

      <table className="table-shadow border rounded m-3">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Url</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
         {History?.map((item, index) => (
             <tr>
              <td>{index+1}</td>
              <td>{item.cardName}</td>
              <td>{item.url}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default WatchHistory;
