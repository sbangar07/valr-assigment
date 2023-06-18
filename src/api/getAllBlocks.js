import { useState, useEffect } from "react";
import axios from "axios";
import { Blocks } from "../models/block";
import moment from "moment";

const GetAllBlocks = () => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [titles, setTiltles] = useState([]);
  const [usdPrice, setUsdPrice] = useState("");

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
          const blockData = results.slice(0, 15).map((record) => {
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
          setError("Error while fetching the block details");
        }
      } catch (err) {
        setError("Error while fetching the block details");
        console.error("Error fetching data:", error);
      }
    }

    const getMinerDetails = async (blockData) => {
      try {
        const url = process.env.REACT_APP_MINER_DATA_FILE_PATH;
        await Promise.all(
          blockData.map(async (block) => {
            const response = await axios(url);
            const results = await response.data.payout_addresses;
            const propertyExists = results.hasOwnProperty(block.Miner);
            if (propertyExists) {
              block.Miner = results[block.Miner].name;
            } else {
              block.Miner = "Unknown";
            }
          })
        );
        getUsdPriceOfBitcon(blockData);
        setIsPending(false);
      } catch (error) {
        setIsPending(false);
        console.error("Error fetching data:", error);
        return;
      }
    };

    const getUsdPriceOfBitcon = async (blockData) => {
      try {
        const url = process.env.REACT_APP_EXCHANGE_RATE_API;
        const response = await axios(url);
        const results = response.data;
        setUsdPrice(`$  ${results["USD"]["15m"].toLocaleString("en-US")}`);
        setData(blockData);
        setIsPending(false);
      } catch (error) {
        setIsPending(false);
        console.error("Error fetching data:", error);
        return;
      }
    };

    const fetchBlocksSizes = async (resultData) => {
      try {
        if (resultData.length > 0) {
          const apiBaseURL = process.env.REACT_APP_SINGLE_BLOCK_API;
          await Promise.all(
            resultData.map(async (blockSize) => {
              const url = apiBaseURL + blockSize.Hash;
              const response = await axios(url);
              const results = await response.data;
              blockSize.Miner = results.tx[0].out[0].addr;
              blockSize.Size = results.size.toLocaleString("en-US") + " bytes";
            })
          );
          getMinerDetails(resultData);
        }
      } catch (err) {
        setError(err.message);
        setIsPending(false);
        console.error("Error fetching data:", error);
      }
    };

    const fetchDataTimer = setTimeout(() => {
      fetchBlocksData();
    }, 3000);

    return () => {
      clearTimeout(fetchDataTimer);
    };
  }, [error]);

  return { data, titles, usdPrice, isPending, error };
};

export default GetAllBlocks;
