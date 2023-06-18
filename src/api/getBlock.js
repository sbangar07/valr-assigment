import { useState, useEffect } from "react";
import axios from "axios";
import { SingleBlock } from "../models/blockdetails";

const GetBlock = (hash) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlockDetails = async () => {
      if (hash) {
        const url = process.env.REACT_APP_SINGLE_BLOCK_API + hash;
        try {
          const response = await axios(url);
          const blockresponse = response.data;
          const result = blockresponse.data?.[hash]?.decoded_raw_block;
          if (result) {
            const newData = new SingleBlock(
              result.hash,
              result.confirmations,
              Date(result.time),
              result.height,
              "Sachin",
              result.nTx,
              converNumberToLocalString(result.difficulty),
              result.merkleroot,
              "0x" + result.versionHex,
              converNumberToLocalString(parseInt(result.bits, 16)),
              converNumberToLocalString(result.weight),
              converNumberToLocalString(result.size) + "bytes",
              result.nonce,
              "Transactionvolume",
              "BlockReward",
              "FeeReward BTC"
            );
            setData(newData);
          } else {
            setData("");
          }
          setIsPending(false);
        } catch (err) {
          debugger;
          if (err.response.status === 404) {
            setError("Oops! We couldn't find what you are looking for.");
          } else {
            setError(err.message);
          }
          setIsPending(false);
        }
      }
    };

    fetchBlockDetails();
  }, [hash]);

  const converNumberToLocalString = (number) => {
    return number.toLocaleString("en-US");
  };

  return { data, isPending, error };
};

export default GetBlock;
