import styled from "styled-components";

const Progress = () => {
  return <ProgressContainer>Loading...</ProgressContainer>;
};

export default Progress;

const ProgressContainer = styled.div`
  margin: auto;
  width: 50%;
  border: 3px;
  padding: 10px;
  color: #1c0950;
  font-weight: 700;
  font-family: proxima-nova, sans-serif;
`;
