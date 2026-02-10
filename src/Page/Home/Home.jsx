import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Banner from '../../components/Banner/Banner'
import RowList from '../../components/Rows/RowList/RowList'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [selectedGenre, setSelectedGenre] = useState(null);
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
      <Header
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
        setSelectedGenre={setSelectedGenre}
        selectedCategory={selectedCategory}
      />
      <Banner myList={myList} updateMyList={updateMyList} />
      <RowList
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedGenre={selectedGenre}
        myList={myList}
        updateMyList={updateMyList}
      />
      <Footer />
    </div>
  )
}

export default Home
