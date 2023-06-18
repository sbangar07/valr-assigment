import styled from "styled-components";
import { Link } from "react-router-dom";
import GetAllBlocks from "../api/getAllBlocks";

const BlockchainExplorer = () => {
  const { error, isPending, data, titles } = GetAllBlocks();
  debugger;
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
    <div className='raw'>
      <caption
        style={{
          textAlign: "left",
          fontSize: "initial",
        }}
      >
        <strong> LatestBlock </strong>
      </caption>
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
                    <Link to={`/block/${item[title]}`}>
                      {item[title].substring(0, 3) +
                        ".." +
                        item[title].substr(19, item[title].length)}
                    </Link>
                  </td>
                ) : (
                  <td key={index}>{item[title]}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default BlockchainExplorer;

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.6em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-collapse: separate;
  border-spacing: 0 1em;
  text-align: left;
  text-color: blue;
  border-top: none !important;
  border-bottom: 1px solid #ebe5e5;
  

  thead tr {
    background-color: #f5f5f5;
    color: #ffffff;
    text-align: left;

   th, td {
    padding: 12px 15px;
  }

 tbody tr {
    border-bottom: 1px solid #dddddd;
}

 tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

 tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

 tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}

`;
