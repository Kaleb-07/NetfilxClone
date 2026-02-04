import React from "react";
import Row from "../Row/Row";
import requests from "../../../utils/requests";

function RowList({ searchQuery, myList, updateMyList }) {
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

  return (
    <>
      {myList && myList.length > 0 && (
        <Row title="My List" moviesData={myList} myList={myList} updateMyList={updateMyList} />
      )}
      {/* fetch the titles*/}
      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLarge
        myList={myList}
        updateMyList={updateMyList}
      />
      {/* fetch differ kinds of movies*/}
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

export default RowList;
