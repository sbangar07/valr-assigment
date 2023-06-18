import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <StyledNav>
      <LeftDiv>
        <BlockExplorer>Block Explorer</BlockExplorer>
      </LeftDiv>
      <RightDiv>
        <Wrapper>
          <SearchInputWrapper>
            <SearchIcon src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K' />
            <SearchInput
              placeholder='Search for the block'
              type='text'
              value={inputValue}
              onChange={handleInputChange}
            />
          </SearchInputWrapper>
          <SearchButton>
            <Link
              to={`/block/${inputValue}`}
              style={{ "text-decoration": "none", color: "#EDEADE" }}
            >
              Search
            </Link>
          </SearchButton>
        </Wrapper>
      </RightDiv>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  padding: 20px;
  display: flex;
  align-items: center;
  max-width: 700px;
  margin: 0 auto;
  border-bottom: 1px solid #f2f2f2;
`;

const BlockExplorer = styled.div`
  white-space: nowrap;
  font-weight: bold;
  font-size: 15px;
  margin-right: 10px;
  font-family: Bookman Old Style;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInputWrapper = styled.div`
  position: relative;
`;

const SearchIcon = styled.img`
  width: 14px;
  margin-right: 8px;
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
`;

const SearchInput = styled.input`
  border: 1px solid grey;
  border-radius: 5px;
  height: 20px;
  padding: 2px 23px 2px 30px;
  outline: 0;
  background-color: #f5f5f5;
  width: 364px;

  &:hover,
  &:focus {
    border: 1.5px solid #009688;
    background-color: white;
  }
`;

const SearchButton = styled.button`
  background-color: hsl(206, 100%, 52%);
  box-shadow: none;
  color: white;
  margin-left: 15px;
  border-radius: 3px;
  font-family: Bookman Old Style;
`;

// const Links = styled.div`
//   margin-left: auto;
// `;

const LeftDiv = styled.div`
  flex: 1;
  padding: 10px;
  text-align: left;
`;

const RightDiv = styled.div`
  flex: 1;
  padding: 1px;
  margin: auto;
`;

export default Navbar;
