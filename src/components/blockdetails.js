import "../Block.css";
import React from "react";
import { useParams } from "react-router-dom";
import GetBlock from "../api/getBlock";
import Bitcoin from "../Images/bitcoinBlock.png";
const BlockDetails = () => {
  const { hash } = useParams();
  const { error, isPending, data } = GetBlock(hash);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className='container'>
      <div className='table-row'>
        <img className='btcImage' src={Bitcoin}></img>
      </div>
      <div className='table-row'>
        <div className='col'>
          Block at depth {data.Heigh} in the Bitcoin Blockchain
        </div>
        <div className='col1'>{data.Hash}</div>
      </div>
      <div className='table-row'>
        <div className='col'>Hash</div>
        <div className='col1'>{data.Hash}</div>
      </div>
      <div className='table-row'>
        <div className='col'>Confirmations</div>
        <div className='col1'>{data.Confirmation}</div>
      </div>

      <div className='table-row'>
        <div className='col'>Timestamp</div>
        <div className='col1'>{data.Timestamp}</div>
      </div>

      <div className='table-row'>
        <div className='col'>Height</div>
        <div className='col1'>{data.Heigh}</div>
      </div>

      <div className='table-row'>
        <div className='col'>Miner</div>
        <div className='col1'>{data.Miner}</div>
      </div>

      <div className='table-row'>
        <div className='col'>Number Of Transaction</div>
        <div className='col1'>{data.NoOfTransaction}</div>
      </div>

      <div className='table-row'>
        <div className='col'>Difficulty</div>
        <div className='col1'>{data.Difficulty}</div>
      </div>

      <div className='table-row'>
        <div className='col'>Market Root</div>
        <div className='col1'>{data.MarketRoot}</div>
      </div>

      <div className='table-row'>
        <div className='col'>Version</div>
        <div className='col1'>{data.Version}</div>
      </div>

      <div className='table-row'>
        <div className='col'>Bits</div>
        <div className='col1'>{data.Bits}</div>
      </div>

      <div className='table-row'>
        <div className='col'>Weight</div>
        <div className='col1'>{data.Weight + " WC"}</div>
      </div>

      <div className='table-row'>
        <div className='col'>Size</div>
        <div className='col1'>{data.Size}</div>
      </div>
      <div className='table-row'>
        <div className='col'>Nonce</div>
        <div className='col1'>{data.Nonce}</div>
      </div>
      <div className='table-row'>
        <div className='col'>Transaction volume</div>
        <div className='col1'>{data.TransactionVolumn}</div>
      </div>
      <div className='table-row'>
        <div className='col'>Block Reward</div>
        <div className='col1'>{data.BlockReward}</div>
      </div>

      <div className='table-row'>
        <div className='col'>Fee Reward</div>
        <div className='col1'>{data.FeeReward}</div>
      </div>
    </div>
  );
};

export default BlockDetails;
