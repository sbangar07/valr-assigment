import styled from "styled-components";

const Error = () => {
  return <ProgressContainer>Loading...</ProgressContainer>;
};

export default Error;

const ProgressContainer = styled.div`
  margin: auto;
  width: 50%;
  border: 3px;
  padding: 10px;
  color: #ff0000;
  font-weight: 500;
  font-family: proxima-nova, sans-serif;
`;
