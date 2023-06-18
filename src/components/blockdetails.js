import React from "react";
import { useParams } from "react-router-dom";
import GetBlock from "../api/getBlock";
import Bitcoin from "../Images/bitcoinBlock.png";
import styled from "styled-components";
import Progress from "./childcomponents/progressbar";
import Error from "./childcomponents/errorInfo";

const BlockDetails = () => {
  const { hash } = useParams();
  const { error, isPending, data } = GetBlock(hash);

  if (isPending) {
    return <Progress />;
  }

  if (error) {
    return <Error />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <DivFlex>
        <Container>
          <TableRow>
            <BtcImage style={{ width: "180px" }} src={Bitcoin} alt='Bitcoin' />
          </TableRow>
          <TableRow>
            <Col>Block at depth {data.Heigh} in the Bitcoin Blockchain</Col>
            <Col1></Col1>
          </TableRow>
        </Container>
        <Container>
          <TableRow>
            <Col>Hash</Col>
            <Col1>{data.Hash}</Col1>
          </TableRow>
          <TableRow>
            <Col>Confirmations</Col>
            <Col1>{data.Confirmation}</Col1>
          </TableRow>
          <TableRow>
            <Col>Timestamp</Col>
            <Col1>{data.Timestamp}</Col1>
          </TableRow>
          <TableRow>
            <Col>Height</Col>
            <Col1>{data.Heigh}</Col1>
          </TableRow>
          <TableRow>
            <Col>Miner</Col>
            <Col1 style={{ color: "#0000ff" }}>{data.Miner}</Col1>
          </TableRow>
          <TableRow>
            <Col>Number Of Transaction</Col>
            <Col1>{data.NoOfTransaction}</Col1>
          </TableRow>
          <TableRow>
            <Col>Difficulty</Col>
            <Col1>{data.Difficulty}</Col1>
          </TableRow>
          <TableRow>
            <Col>Market Root</Col>
            <Col1>{data.MarketRoot}</Col1>
          </TableRow>
          <TableRow>
            <Col>Version</Col>
            <Col1>{data.Version}</Col1>
          </TableRow>
          <TableRow>
            <Col>Bits</Col>
            <Col1>{data.Bits}</Col1>
          </TableRow>
          <TableRow>
            <Col>Weight</Col>
            <Col1>{data.Weight} WU</Col1>
          </TableRow>
          <TableRow>
            <Col>Size</Col>
            <Col1>{data.Size} bytes</Col1>
          </TableRow>
          <TableRow>
            <Col>Nonce</Col>
            <Col1>{data.Nonce}</Col1>
          </TableRow>
          <TableRow>
            <Col>Transaction volume</Col>
            <Col1>54673757</Col1>
          </TableRow>
          <TableRow>
            <Col>Block Reward</Col>
            <Col1>{data.FeeReward} BTC</Col1>
          </TableRow>
          <TableRow>
            <Col>Fee Reward</Col>
            <Col1>{data.BlockReward} BTC</Col1>
          </TableRow>
        </Container>
      </DivFlex>
    </>
  );
};

export default BlockDetails;

const Container = styled.div`
  display: table;
  width: 80%;
  border-collapse: collapse;
`;

const TableRow = styled.div`
  display: table-row;
  text-align: left;
  padding: 15px;
`;

const Col = styled.div`
  display: table-cell;
  line-height: 1.1em;
  font-family: system-ui;
  font-size: small;
  padding: 7px;
  border-top: none !important;
  margin-left: -20px;
  line-height: 1.1em;
  border-bottom: 1px solid #ebe5e5;
  font-weight: 550;
  color: #575252;
`;

const Col1 = styled.div`
  display: table-cell;
  line-height: 1.1em;
  font-family: Bookman Old Style;
  font-size: small;
  padding: 7px;
  border-top: none !important;
  margin-left: -20px;
  border-bottom: 1px solid #ebe5e5;
  font-weight: 550;
  color: #272424;
`;

const BtcImage = styled.img`
  width: 100%;
  background-color: powderblue;
`;

const DivFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
