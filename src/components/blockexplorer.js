import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import GetAllBlocks from "../api/getAllBlocks";
import Progress from "./childcomponents/progressbar";
import Error from "./childcomponents/errorInfo";
import BitcoinUSD from "../Images/Bitcoinsvg.png";

const BlockchainExplorer = () => {
  const { error, isPending, usdPrice, data, titles } = GetAllBlocks();
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
      <ContainerExplorer>
        <LeftDiv>
          {" "}
          <BtcUDDImage
            style={{ width: "50px" }}
            src={BitcoinUSD}
            alt='Bitcoin'
          />
          <h5 style={{ margin: "-6px" }}>{usdPrice}</h5>
        </LeftDiv>
        <RightDiv>
          <h5>Latest Blocks</h5>
          <StyledTable>
            <thead>
              <tr>
                {titles.map((title, index) => (
                  <th key={index}>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.hash}>
                  {titles.map((title, index) =>
                    title === "Hash" ? (
                      <td key={item.hash}>
                        <StyledLink>
                          <Link
                            to={`/block/${item[title]}`}
                            style={{
                              "text-decoration": "none",
                              color: "#1F75FE",
                            }}
                          >
                            {item[title].substring(0, 3) +
                              ".." +
                              item[title].substr(19, item[title].length)}
                          </Link>
                        </StyledLink>
                      </td>
                    ) : title === "Height" || title === "Miner" ? (
                      <td style={{ color: "#1F75FE" }} key={index}>
                        {item[title]}
                      </td>
                    ) : (
                      <td key={index}>{item[title]}</td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </RightDiv>
      </ContainerExplorer>
    </>
  );
};

export default BlockchainExplorer;

const StyledTable = styled.table`
  margin: 2px 0;
  font-family: Bookman Old Style;
  font-size: 10px;
  font-weight: 500;
  min-width: 80%;
  border-spacing: 0 1em;
  text-align: left;
  border-top: none !important;
  border-bottom: 1px solid #ebe5e5;
  border-collapse: collapse;

  thead tr {
    background-color: #f5f5f5;
    color: #575252;
    text-align: left;
    border-top: none !important;
    border-bottom: 1px solid #ebe5e5;

    th {
      padding: 5px 8px;
      text-align: left;
    }
  }

  tbody tr {
    border-top: none !important;
    border-bottom: 1px solid #ebe5e5;
    line-height: 3.2em;
  }
`;

const BtcUDDImage = styled.img`
  height: 40px;
  width: 40px;
  background-color: powderblue;
`;

const ContainerExplorer = styled.div`
  display: flex;
`;

const LeftDiv = styled.div`
  flex: 1;
  padding: 10px;
  text-align: right;
  width: 60px;
  margin: 10px 20px;
  width: 100px;
`;

const RightDiv = styled.div`
  flex: 3;
  padding: 1px;
  margin: auto;
  width: 50%;
`;

const StyledLink = styled.a`
color: "#1F75FE",
"text-decoration": "none";
`;
