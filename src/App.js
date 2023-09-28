import { useEffect, useState } from "react";
import searchImage from "./images/search.svg";
import Card from "./components/Card";
import Footer from "./components/Footer";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [keyWord, setKeyword] = useState("superman");
  const url = "https://www.omdbapi.com/?apikey=c032e2d7";
  const [searching, setSearching] = useState(false);

  async function searchMovies() {
    try {
      setSearching(true);
      const response = await fetch(`${url}&s=${keyWord}`);
      const data = await response.json();
      setMovies(data.Search);
    } catch (error) {
      console.log(error);
    } finally {
      setSearching(false);
    }
  }

  function handleChange(event) {
    setKeyword(event.target.value);
  }

  useEffect(() =>{
    searchMovies()}
    
  , []);

  const cardElements = movies ? (
    movies.map((movie,index) => <Card movie={movie} id={movie.imdbID} key ={index} />)
  ) : (
    <div className="no-movie">
      <p>No movies found.</p>
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movieland</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search for movies"
            value={keyWord}
            onKeyDown={(e)=> {if(e.key === "Enter") {searchMovies()} }}
            onChange={(event) => {
              handleChange(event);
            }}
          />

          <img
            className="search-image"
            src={searchImage}
            alt="search logo"
            onClick={() => {
              searchMovies();
            }}
          />
        </div>
        {keyWord.length < 3 && <p className="helper">Type at least 3 letters</p>}

      </header>
      {searching ? (
        <p className="loading">Hold on! Loading...</p>
      ) : (
        <div className="card-containter">{cardElements}</div>
      )}
      <Footer />
    </div>
  );
}
