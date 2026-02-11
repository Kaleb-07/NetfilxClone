import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import requests from '../../../utils/requests';
import './TrendingSection.css';

const TrendingSection = ({ title }) => {
    const [movies, setMovies] = useState([]);
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

    return (
        <div className="trending-section">
            <div className="trending-section__container">
                <h2>{title}</h2>
                <div className="trending-section__posters">
                    {movies.map((movie, index) => (
                        movie.poster_path && (
                            <div key={movie.id} className="trending-poster-wrapper">
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
            </div>
        </div>
    );
};

export default TrendingSection;
