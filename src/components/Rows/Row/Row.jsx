import React, { useEffect, useState, useRef } from "react";
import axios from "../../../utils/axios";
import "./Row.css";
import movieTrailer from "movie-trailer";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MovieModal from "./MovieModal";

function Row({ title, fetchUrl, isLarge, moviesData, myList, updateMyList }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const rowRef = useRef(null);

  useEffect(() => {
    if (moviesData) {
      setMovies(moviesData);
      return;
    }
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl, moviesData]);

  const handleClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === "left"
        ? scrollLeft - clientWidth + 200
        : scrollLeft + clientWidth - 200;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>

      <div className="row__container">
        <div className="row__arrow row__arrow--left" onClick={() => handleScroll("left")}>
          <ArrowBackIosNewIcon />
        </div>

        <div className="row__posters" ref={rowRef}>
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLarge && "row__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/w500${isLarge ? movie.poster_path : movie.backdrop_path
                }`}
              alt={movie?.name || movie?.title}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>

        <div className="row__arrow row__arrow--right" onClick={() => handleScroll("right")}>
          <ArrowForwardIosIcon />
        </div>
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          setModalOpen={setSelectedMovie}
          updateMyList={updateMyList}
          myList={myList}
        />
      )}
    </div>
  );
}

export default Row;
