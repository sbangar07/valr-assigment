import "./App.css";
import React from "react";
import BlockchainExplorer from "./components/blockexplorer";
import BlockDetails from "./components/blockdetails";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div>
          <Routes>
            <Route exact path='/' element={<BlockchainExplorer />} />
            <Route path='/block/:hash' element={<BlockDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
