import React from 'react';
import SwapiData from "./components/SwapiData";
import styled from "styled-components";

const Header = styled.div`
  background-color: black;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: gold;
  font-family: 'Bangers', cursive;
`
const Apps = styled.div`
  text-align: center;
  
`


 
function App() {
 
  
  return (
    <Apps>
      <Header >
        <h1>Star Wars API</h1>
      </Header>
      <main>
        <SwapiData />
      </main>
    </Apps >
  );
}
export default App;
