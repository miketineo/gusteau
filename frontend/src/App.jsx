import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import SearchBar from './inputs/SearchBar'
import ResultList from "./datadisplay/ResultList"


function App() {

  const initialState = () => {
    getAllRecipes();
    itemData();
  }

  const getAllRecipes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/recipes/');
      const data = await response.json();
      setResults(data); // Assuming data is an array of results
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const fetchData = async (query) => {
    if (!query) return ''; else {
      try {
        const response = await fetch(`http://localhost:3000/api/recipes/search?q=${query}`);
        const data = await response.json();
        setResults(data); // Assuming data is an array of results
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
  
  const itemData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/ingredients');
      const data = await response.json();
      setOptions(data.map(ingredient => ingredient.name)); // Assuming data is an array of results
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleSearch = (newValue) => {
    console.log('handle search '+newValue);
    setValue(newValue);
    fetchData(value);
  } 

  const [value, setValue] = React.useState(false);
  const [results, setResults] = React.useState(() => getAllRecipes());
  const [options, setOptions] = React.useState(() => itemData());


  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Stack><SearchBar onSearch={handleSearch} selections={options} /></Stack>
        <Stack><ResultList results={results} /></Stack>
      </Stack>
    </Box>
    {/* <AutoComplete />
    <ResultList /> */}
    </>
  )
}

export default App
