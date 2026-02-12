import React from "react";
import Row from "../Row/Row";
import requests from "../../../utils/requests";
import { useLanguage } from "../../../utils/LanguageContext";

function RowList({ searchQuery, selectedCategory, selectedGenre, myList, updateMyList }) {
  const { t } = useLanguage();

  // Search state takes priority
  if (searchQuery) {
    return (
      <div className="search-results-container" style={{ paddingTop: '80px' }}>
        <Row
          title={`${t('categories.resultsFor')} "${searchQuery}"`}
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
            <Row title={t('categories.trendingTvShows')} fetchUrl={requests.fetchTvShow} isLarge myList={myList} updateMyList={updateMyList} />
            <Row title={t('categories.netflixOriginals')} fetchUrl={requests.fetchNetflixOriginals} myList={myList} updateMyList={updateMyList} />
          </>
        );

      case "Movies":
        if (selectedGenre) {
          return (
            <Row
              title={`${t(`genres.${selectedGenre.name.toLowerCase()}`)} ${t('header.movies')}`}
              fetchUrl={`/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_genres=${selectedGenre.id}`}
              isLarge
              myList={myList}
              updateMyList={updateMyList}
            />
          );
        }
        return (
          <>
            <Row title={t('categories.trendingMovies')} fetchUrl={requests.fetchTrending} isLarge myList={myList} updateMyList={updateMyList} />
            <Row title={t('categories.actionMovies')} fetchUrl={requests.fetchActionMovies} myList={myList} updateMyList={updateMyList} />
            <Row title={t('categories.comedyMovies')} fetchUrl={requests.fetchComedyMovies} myList={myList} updateMyList={updateMyList} />
            <Row title={t('categories.horrorMovies')} fetchUrl={requests.fetchHorrorMovies} myList={myList} updateMyList={updateMyList} />
            <Row title={t('categories.romanceMovies')} fetchUrl={requests.fetchRomanceMovies} myList={myList} updateMyList={updateMyList} />
          </>
        );

      case "New & Popular":
        return (
          <>
            <Row title={t('categories.comingSoon')} fetchUrl={requests.fetchUpcoming} isLarge myList={myList} updateMyList={updateMyList} />
            <Row title={t('categories.trendingNow')} fetchUrl={requests.fetchTrending} myList={myList} updateMyList={updateMyList} />
          </>
        );

      case "My List":
        return (
          <div style={{ paddingTop: '80px', minHeight: '80vh' }}>
            {myList && myList.length > 0 ? (
              <Row title={t('categories.myList')} moviesData={myList} myList={myList} updateMyList={updateMyList} isLarge />
            ) : (
              <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>
                <h2>{t('categories.emptyList')}</h2>
                <p>{t('categories.emptyListSubtitle')}</p>
              </div>
            )}
          </div>
        );

      default: // Home
        return (
          <>
            {myList && myList.length > 0 && (
              <Row title={t('categories.myList')} moviesData={myList} myList={myList} updateMyList={updateMyList} />
            )}
            <Row title={t('categories.netflixOriginals')} fetchUrl={requests.fetchNetflixOriginals} isLarge myList={myList} updateMyList={updateMyList} />
            <Row title={t('categories.trendingNow')} fetchUrl={requests.fetchTrending} myList={myList} updateMyList={updateMyList} />
            <Row title={t('categories.topRated')} fetchUrl={requests.fetchTopRated} myList={myList} updateMyList={updateMyList} />
            <Row title={t('categories.actionMovies')} fetchUrl={requests.fetchActionMovies} myList={myList} updateMyList={updateMyList} />
            <Row title={t('categories.comedyMovies')} fetchUrl={requests.fetchComedyMovies} myList={myList} updateMyList={updateMyList} />
            <Row title={t('categories.horrorMovies')} fetchUrl={requests.fetchHorrorMovies} myList={myList} updateMyList={updateMyList} />
            <Row title={t('categories.romanceMovies')} fetchUrl={requests.fetchRomanceMovies} myList={myList} updateMyList={updateMyList} />
            <Row title={t('categories.documentaries')} fetchUrl={requests.fetchDocumentaries} myList={myList} updateMyList={updateMyList} />
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
