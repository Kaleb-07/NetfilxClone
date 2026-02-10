import React, { useEffect } from "react";
import Row from "../Row/Row";
import requests from "../../../utils/requests";

function RowList({ searchQuery, selectedCategory, selectedGenre, myList, updateMyList }) {

  // Search state takes priority
  if (searchQuery) {
    return (
      <div className="search-results-container" style={{ paddingTop: '80px' }}>
        <Row
          title={`Results for "${searchQuery}"`}
          fetchUrl={requests.fetchSearch(searchQuery)}
          isLarge
          myList={myList}
          updateMyList={updateMyList}
        />
      </div>
    );
  }

  // Render content based on selected category
  const renderRows = () => {
    switch (selectedCategory) {
      case "TV Shows":
        return (
          <>
            <Row title="Trending TV Shows" fetchUrl={requests.fetchTvShow} isLarge myList={myList} updateMyList={updateMyList} />
            <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} myList={myList} updateMyList={updateMyList} />
          </>
        );

      case "Movies":
        if (selectedGenre) {
          return (
            <Row
              title={`${selectedGenre.name} Movies`}
              fetchUrl={`/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_genres=${selectedGenre.id}`}
              isLarge
              myList={myList}
              updateMyList={updateMyList}
            />
          );
        }
        return (
          <>
            <Row title="Trending Movies" fetchUrl={requests.fetchTrending} isLarge myList={myList} updateMyList={updateMyList} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} myList={myList} updateMyList={updateMyList} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} myList={myList} updateMyList={updateMyList} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} myList={myList} updateMyList={updateMyList} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} myList={myList} updateMyList={updateMyList} />
          </>
        );

      case "New & Popular":
        return (
          <>
            <Row title="Coming Soon" fetchUrl={requests.fetchUpcoming} isLarge myList={myList} updateMyList={updateMyList} />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} myList={myList} updateMyList={updateMyList} />
          </>
        );

      case "My List":
        return (
          <div style={{ paddingTop: '80px', minHeight: '80vh' }}>
            {myList && myList.length > 0 ? (
              <Row title="My List" moviesData={myList} myList={myList} updateMyList={updateMyList} isLarge />
            ) : (
              <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>
                <h2>Your list is empty.</h2>
                <p>Add some movies or TV shows to see them here.</p>
              </div>
            )}
          </div>
        );

      default: // Home
        return (
          <>
            {myList && myList.length > 0 && (
              <Row title="My List" moviesData={myList} myList={myList} updateMyList={updateMyList} />
            )}
            <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLarge myList={myList} updateMyList={updateMyList} />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} myList={myList} updateMyList={updateMyList} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} myList={myList} updateMyList={updateMyList} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} myList={myList} updateMyList={updateMyList} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} myList={myList} updateMyList={updateMyList} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} myList={myList} updateMyList={updateMyList} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} myList={myList} updateMyList={updateMyList} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} myList={myList} updateMyList={updateMyList} />
          </>
        );
    }
  };

  return (
    <div className="row-list-container">
      {renderRows()}
    </div>
  );
}

export default RowList;
