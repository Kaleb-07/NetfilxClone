import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./Banner.css";
import MovieModal from "../Rows/Row/MovieModal";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Banner({ myList, updateMyList }) {
  const [movie, setMovie] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const selectedMovie = request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
      ];
      setMovie(selectedMovie);

      if (selectedMovie) {
        try {
          const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
          const type = selectedMovie.first_air_date ? "tv" : "movie";
          const { data } = await axios.get(`/${type}/${selectedMovie.id}/videos?api_key=${API_KEY}`);

          const trailer = data.results.find(
            (vid) => vid.type === "Trailer" && vid.site === "YouTube"
          ) || data.results[0];

          if (trailer) {
            setTrailerUrl(trailer.key);
          } else {
            movieTrailer(selectedMovie?.name || selectedMovie?.title || selectedMovie?.original_name || "")
              .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
              });
          }
        } catch (error) {
          console.error("Error fetching trailer:", error);
        }
      }
      return request;
    }
    fetchData();
  }, []);
  {/* each truncated */ }
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      modestbranding: 1,
      showinfo: 0,
      iv_load_policy: 3,
      autohide: 1,
    },
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: !isPlaying ? `url(
          "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )` : "none",
        backgroundPosition: "center center",
      }}
    >
      {isPlaying && trailerUrl ? (
        <div className="banner__videoWrapper">
          <YouTube
            videoId={trailerUrl}
            opts={opts}
            containerClassName="banner__youtubeContainer"
            onEnd={() => setIsPlaying(false)}
          />
        </div>
      ) : null}

      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button" onClick={() => setIsPlaying(true)}>Play</button>
          <button className="banner__button" onClick={() => setModalOpen(true)}>More Info</button>
        </div>

        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      {!isPlaying && <div className="banner--fadeBottom" />}

      {modalOpen && (
        <MovieModal
          movie={movie}
          setModalOpen={setModalOpen}
          myList={myList}
          updateMyList={updateMyList}
        />
      )}
    </header>
  );
}

export default Banner;
