import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Banner from '../../components/Banner/Banner'
import RowList from '../../components/Rows/RowList/RowList'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("myList") || "[]");
    setMyList(savedList);
  }, []);

  const updateMyList = (newList) => {
    setMyList(newList);
    localStorage.setItem("myList", JSON.stringify(newList));
  };

  return (
    <div>
      {/* To Track components */}
      <Header setSearchQuery={setSearchQuery} />
      <Banner myList={myList} updateMyList={updateMyList} />
      {searchQuery ? (
        <RowList searchQuery={searchQuery} myList={myList} updateMyList={updateMyList} />
      ) : (
        <RowList myList={myList} updateMyList={updateMyList} />
      )}
      <Footer />
    </div>
  )
}

export default Home
