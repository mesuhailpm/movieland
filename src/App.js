import { useEffect, useState } from "react";
import searchImage from "./images/search.svg";
import Card from "./components/Card";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [temporaryKeyWord, setTemporaryKeyWord] = useState("superman");
  const [keyWord, setKeyword] = useState("unset");
  const url = "https://www.omdbapi.com/?apikey=c032e2d7";
  const [searching, setSearching] = useState(false);

  async function searchMovies(title) {
    try {
      setSearching(true);
      const response = await fetch(`${url}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search);
      console.log(movies);
    } catch (error) {
      alert(error);
    } finally {
      setSearching(false);
    }
  }

  function handleChange(event) {
    setTemporaryKeyWord(event.target.value);
    console.log(event.target.value);
  }
  function startSearch() {
    setKeyword(temporaryKeyWord);
  }

  useEffect(() => {
    if (keyWord === "unset") {
      searchMovies(temporaryKeyWord);
    } else {
      searchMovies(keyWord);
    }
  }, [keyWord]);

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
            value={temporaryKeyWord}
            onKeyDown={(e)=> {if(e.key === "Enter") {setKeyword(temporaryKeyWord)} }}
            onChange={(event) => {
              handleChange(event);
            }}
          />

          <img
            className="search-image"
            src={searchImage}
            alt="search logo"
            onClick={() => {
              startSearch();
            }}
          />
        </div>
      </header>
      {searching ? (
        <p className="loading">Hold on! Loading...</p>
      ) : (
        <div className="card-containter">{cardElements}</div>
      )}
    </div>
  );
}
