import { useState, useEffect } from "react";
import axios from "axios";
import { Blocks } from "../models/block";
import moment from "moment";

const GetAllBlocks = () => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [titles, setTiltles] = useState([]);

  useEffect(() => {
    async function fetchBlocksData() {
      try {
        const currentTime = Date.now();
        const apiUrl =
          process.env.REACT_APP_MULTI_BLOCK_API + currentTime + "?format=json";
        const response = await axios(apiUrl);
        if (response.data.length > 0) {
          const results = response.data;
          results.sort(function (a, b) {
            const keyA = new Date(a.time),
              keyB = new Date(b.time);
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
          });
          const blockData = results.slice(0, 5).map((record) => {
            debugger;
            const mineTime = moment(new Date(1686985545000))
              .fromNow()
              .replace("ago", "");
            return new Blocks(record.height, record.hash, mineTime, "", 0);
          });
          setTiltles(Object.keys(blockData[0]));
          setTimeout(function () {
            fetchBlocksSizes(blockData);
          }, 3000);
        } else {
          setError("Error while fetching the details from API");
        }
      } catch (err) {
        setError(err.message);
        setIsPending(false);
        console.log(err);
      }
    }

    const fetchBlocksSizes = async (resultData) => {
      try {
        if (resultData.length > 0) {
          const baseUrl = process.env.REACT_APP_SINGLE_BLOCK_API;
          const apiBaseURL = "https://blockchain.info/rawblock/";

          //   const updatedData = await Promise.all(
          //     resultData.map(async (blockSize) => {
          //       const url = baseUrl + blockSize.Hash;
          //       const response = await axios(url);
          //       const blockresponse = await response.data;
          //       const result = blockresponse.data?.[blockSize.Hash]?.decoded_raw_block;
          //       if (result.size) {
          //         blockSize.Size = result.size.toLocaleString("en-US") + " bytes";
          //       }
          //       return blockSize;
          //     })
          //   );
          //  setData(updatedData);

          await Promise.all(
            resultData.map(async (blockSize) => {
              const url = apiBaseURL + blockSize.Hash;
              const response = await axios(url);
              const results = await response.data;
              //   results.tx = [];
              blockSize.Size = results.size.toLocaleString("en-US") + " bytes";
            })
          );
          debugger;
          setData(resultData);
          setIsPending(false);
        }
      } catch (err) {
        setError(err.message);
        setIsPending(false);
        console.log(err);
      }
    };

    const fetchDataTimer = setTimeout(() => {
      fetchBlocksData();
    }, 3000);

    return () => {
      clearTimeout(fetchDataTimer);
    };
  }, []);

  return { data, titles, isPending, error };
};

export default GetAllBlocks;
