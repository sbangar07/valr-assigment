import { useState, useEffect } from "react";
import axios from "axios";
import { SingleBlock } from "../models/blockdetails";

const GetBlock = (hash) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMinerDetails = async (blockData) => {
      try {
        const url = process.env.REACT_APP_MINER_DATA_FILE_PATH;
        const response = await axios(url);
        const results = await response.data.payout_addresses;
        const propertyExists = results.hasOwnProperty(blockData.Miner);
        if (propertyExists) {
          blockData.Miner = results[blockData.Miner].name;
        } else {
          blockData.Miner = "Unknown";
        }
        setData(blockData);
        setIsPending(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        return;
      }
    };

    const fetchExtraDataPoints = async (blockData) => {
      if (hash) {
        const url = process.env.REACT_APP_SINGLE_BLOCK_API + hash;
        try {
          const response = await axios(url);
          const results = response.data;
          blockData.Miner = results.tx[0].out[0].addr;
          blockData.BlockReward = results?.fee / 100000000;
          blockData.FeeReward = results.tx[0].out[0].value / 100000000;
          getMinerDetails(blockData);
        } catch (err) {
          setError(err.message);
          setIsPending(false);
        }
      }
    };

    const fetchBlockDetails = async () => {
      if (hash) {
        const url =
          process.env.REACT_APP_SINGLE_BLOCK_API_EXTRA_DATA_POINTS + hash;
        try {
          const response = await axios(url);
          const blockresponse = response.data;
          const result = blockresponse.data?.[hash]?.decoded_raw_block;
          if (result) {
            const newData = new SingleBlock(
              result.hash,
              converNumberToLocalString(result.confirmations),
              formatDate(result.time),
              converNumberToLocalString(result.height),
              "",
              result.nTx,
              converNumberToLocalString(result.difficulty),
              result.merkleroot,
              "0x" + result.versionHex,
              converNumberToLocalString(parseInt(result.bits, 16)),
              converNumberToLocalString(result.weight),
              converNumberToLocalString(result.size),
              converNumberToLocalString(result.nonce),
              "",
              "",
              ""
            );
            fetchExtraDataPoints(newData);
          } else {
            setData("");
            setError("Oops! We couldn't find what you are looking for.");
          }
        } catch (err) {
          setError(err.message);
          setIsPending(false);
        }
      }
    };
    fetchBlockDetails();
  }, [hash]);

  const converNumberToLocalString = (number) => {
    return number.toLocaleString("en-US");
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDate;
  };

  return { data, isPending, error };
};

export default GetBlock;
