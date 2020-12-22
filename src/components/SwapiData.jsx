import React, { useState } from "react";
import styled from "styled-components";

const Content = styled.div`
    font-weight: 700;
    margin: 1em;
    margin-left: auto;
    margin-right: auto;
    height: 1.5em;
    width: 50vw;
    font-family: 'Bangers', cursive;
    font-size: 25px;
    `
const Buttons = styled.button`
    background-color: black;
    font-family: 'Bangers', cursive;
    color: gold;
    width: 10rem;
    height: 3rem;
    margin: 1rem;
    font-size: 20px;

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
  }
`
const DisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Searchbar = styled.div`
    display: flex;
    justify-content: center;
`
const SearchResult = styled.div`
  display: flex;
  flex-direction:column;
  padding: 1.5em;
  margin: 1em;
  border: 1px solid black;
  background-color: rgba(88, 83, 6, 0.534);
  border-radius: 5px;
  font-family: 'Bangers', cursive;

  &:hover{
      background-color: black;
      color:gold;
  }
`
const Inputfield = styled.input`
  height: 2rem;
  justify-content: center;
  margin: 1rem;
  border: 3px solid black;
  background-color:lightgrey;
`
const Text = styled.p`
    color: #6d2509;
`

const SwapiData = () => {
    const [apiData, setApiData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [showForm, setShowform] = useState(false)
    let favoritesData = [];
    const [favorite, setFavorite] = useState(favoritesData)
    let rawData = [];
    let filteredData = [];

    const [name, setName] = useState("")
    const [birth_year, setBirthYear] = useState("")
    const [eye_color, setEyeColor] = useState("")


    async function getData() {
        // let nextUrl = "1";
        // let apiUrl = `https://swapi.dev/api/people/?page=${nextUrl}`;
        let apiUrl = `https://swapi.dev/api/people/?page=1`;
        let hasMorePages = true;

        while (hasMorePages) {
            const response = await fetch(apiUrl);
            const json = await response.json();
            if (!json.next) hasMorePages = false;
            if (hasMorePages) {
                apiUrl = json.next.replace("http", "https");
                json.results.map((obj) => {
                    return rawData.push(obj)
                })
            }
        }
        filterData();
    };


    function filterData() {
        filteredData = [...rawData];
        filteredData = filteredData.filter(item => {
            if (item.name.toLowerCase().includes(searchValue)) return true;
            else if (item.birth_year.toLowerCase().includes(searchValue)) return true;
            else if (item.eye_color.toLowerCase().includes(searchValue)) return true;
            else return false;
        })
        return setApiData(filteredData);
    };
    function enterKeyPressed(event) {
        if (event.key === "Enter") {
            getData();
        }
    }
    function addFavorite(item) {
        let model = {
            name: item.name,
            birth_year: item.birth_year,
            eye_color: item.eye_color
        }
        setFavorite(favoritesData => [...favoritesData, model])
    };
    function removeFavorite(item) {
        setFavorite(favorite.filter(favorite => favorite.name !== item.name))
    }
    function buildFavorite() {
        let model = {
            name: name,
            birth_year: birth_year,
            eye_color: eye_color
        }
        addFavorite(model)
    }
    let spanText = "";
    const elements = apiData.map((result, index) => {
        return (
            <SearchResult key={result.name + index}>
                <p>Name : {result.name}</p>
                <span onClick={() => addFavorite(result)}>{spanText}
                </span>
                <p >Eye color : <span>{result.eye_color}</span></p>
                <p >Birth year : <span>{result.birth_year}</span></p>
            </SearchResult>
        )
    })

    const favorites = favorite.map((item) => {
        return (
            <SearchResult key={item.name}>
                <Text>Name : {item.name}</Text>
                <span onClick={() => removeFavorite(item)}>
                </span>
                <Text>Eye color : <span>{item.eye_color}</span></Text>
                <Text>Birth year : <span>{item.birth_year}</span></Text>
            </SearchResult >
        )
    })

    let buttonText = "Add own favorite";
    if (showForm) {
        buttonText = "Show results"
    };
    return (
        <Content>
            <Searchbar>
            <Inputfield onKeyPress={enterKeyPressed} value={searchValue} onChange={e => setSearchValue(e.target.value.toLowerCase())} type="text" placeholder="Search for your favourite" />
            <Buttons onClick={getData}>Search</Buttons>
            <Buttons onClick={() => setShowform(!showForm)} >{buttonText}</Buttons>
            </Searchbar>
            {showForm ?
                <div>
                    <h2>Add a new favourite:</h2>
                    <DisplayContainer>
                        <label htmlFor="name">Name: <br /><input required id="name" type="text" onChange={e => setName(e.target.value)} /></label>
                        <label htmlFor="birth">Birth year: <br /><input required id="birth" type="text" onChange={e => setBirthYear(e.target.value)} /></label>
                        <label htmlFor="eye">Eye color: <br /><input required id="eye" type="text" onChange={e => setEyeColor(e.target.value)} /></label>
                        <Buttons onClick={buildFavorite} disabled={name === "" || eye_color === "" || birth_year === ""} >Add</Buttons>
                    </DisplayContainer>
                </div>
                : <div>
                    {elements}
                </div>}
            {favorite.length > 0 ?
                <div>
                    <h1>Added favourite character</h1>
                    {favorites}
                </div>
                : null}
        </Content>
    )
}

export default SwapiData;