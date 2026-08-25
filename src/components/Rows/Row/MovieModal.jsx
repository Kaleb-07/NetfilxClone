import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import "./MovieModal.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

function MovieModal({ movie, setModalOpen, myList, updateMyList }) {
    const [trailerUrl, setTrailerUrl] = useState("");
    const [isAdded, setIsAdded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (movie) {
            setIsAdded(myList.find((m) => m.id === movie.id));

            const fetchTrailer = async () => {
                try {
                    // Try to fetching from TMDB first
                    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
                    const type = movie.first_air_date ? "tv" : "movie";
                    const { data } = await axios.get(`/${type}/${movie.id}/videos?api_key=${API_KEY}`);

                    const trailer = data.results.find(
                        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
                    ) || data.results[0];

                    if (trailer) {
                        setTrailerUrl(trailer.key);
                    } else {
                        // Fallback to movie-trailer search
                        movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
                            .then((url) => {
                                const urlParams = new URLSearchParams(new URL(url).search);
                                setTrailerUrl(urlParams.get("v"));
                            });
                    }
                } catch (error) {
                    console.error("Error fetching trailer:", error);
                }
            };

            fetchTrailer();
        }
    }, [movie, myList]);

    const toggleMyList = () => {
        if (isAdded) {
            const newList = myList.filter((m) => m.id !== movie.id);
            updateMyList(newList);
        } else {
            const newList = [...myList, movie];
            updateMyList(newList);
        }
    };

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
        <div className="modal__overlay" onClick={() => setModalOpen(null)}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <div className="modal__close" onClick={() => setModalOpen(null)}>
                    <CloseIcon />
                </div>

                <div className="modal__banner">
                    {isPlaying && trailerUrl ? (
                        <div className="modal__videoWrapper">
                            <YouTube
                                videoId={trailerUrl}
                                opts={opts}
                                containerClassName="modal__youtubeContainer"
                            />
                        </div>
                    ) : (
                        <img
                            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                            alt={movie?.name || movie?.title}
                            className="modal__image"
                        />
                    )}
                    <div className="modal__bannerFade" />
                    <h1 className="modal__title">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>
                </div>

                <div className="modal__details">
                    <div className="modal__actions">
                        <button
                            className="modal__button modal__play"
                            onClick={() => setIsPlaying(true)}
                        >
                            <PlayArrowIcon /> Play
                        </button>
                        <div className="modal__circleButton" onClick={toggleMyList}>
                            {isAdded ? <CheckIcon /> : <AddIcon />}
                        </div>
                        <div className="modal__circleButton">
                            <ThumbUpOffAltIcon />
                        </div>
                    </div>

                    <div className="modal__info">
                        <span className="modal__rating">
                            {movie?.vote_average * 10}% Match
                        </span>
                        <span className="modal__year">
                            {movie?.release_date?.substring(0, 4) ||
                                movie?.first_air_date?.substring(0, 4)}
                        </span>
                        <span className="modal__quality">HD</span>
                    </div>

                    <p className="modal__overview">{movie?.overview}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieModal;
