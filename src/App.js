import logo from "./logo.svg";
import "./App.css";
import React from "react";
import BlockchainExplorer from "./components/blockexplorer";
import BlockDetails from "./components/blockdetails";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    // <div className='App'>
    //   <header className='App-header'>
    //     {/* <img src={logo} className='App-logo' alt='logo' /> */}
    //     <BlockchainExplorer></BlockchainExplorer>
    //   </header>
    // </div>

    <Router>
      {/* <div className='App-header'> */}
      <div>
        {/* <Header /> */}
        <Navbar />
        <div className='App-header'>
          <Routes>
            <Route exact path='/' element={<BlockchainExplorer />} />
            <Route path='/block/:hash' element={<BlockDetails />} />
          </Routes>
        </div>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
