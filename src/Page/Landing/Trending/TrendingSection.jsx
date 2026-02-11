import React, { useState, useEffect, useRef } from 'react';
import axios from '../../../utils/axios';
import requests from '../../../utils/requests';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './TrendingSection.css';

const TrendingSection = ({ title }) => {
    const [movies, setMovies] = useState([]);
    const postersRef = useRef(null);
    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(requests.fetchTrending);
                setMovies(request.data.results);
                return request;
            } catch (error) {
                console.error("Error fetching trending movies:", error);
            }
        }
        fetchData();
    }, []);

    const scroll = (direction) => {
        const { current } = postersRef;
        if (current) {
            const scrollAmount = direction === 'left' ? -500 : 500;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="trending-section">
            <div className="trending-section__container">
                <h2>{title}</h2>
                <div className="trending-section__wrapper">
                    <button className="trending-nav-btn left" onClick={() => scroll('left')}>
                        <ArrowBackIosIcon />
                    </button>
                    <div className="trending-section__posters" ref={postersRef}>
                        {movies.map((movie, index) => (
                            movie.poster_path && (
                                <div key={movie.id} className="trending-poster-wrapper" style={{ '--index': index }}>
                                    <span className="trending-rank">{index + 1}</span>
                                    <img
                                        className="trending-poster"
                                        src={`${base_url}${movie.poster_path}`}
                                        alt={movie.name || movie.title}
                                    />
                                </div>
                            )
                        ))}
                    </div>
                    <button className="trending-nav-btn right" onClick={() => scroll('right')}>
                        <ArrowForwardIosIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrendingSection;
