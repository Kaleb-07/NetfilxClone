import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Banner from '../../components/Banner/Banner'
import RowList from '../../components/Rows/RowList/RowList'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [selectedGenre, setSelectedGenre] = useState(null);

  const [currentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : { email: "guest", profileId: 1 };
  });

  const [activeProfileId, setActiveProfileId] = useState(currentUser.profileId || 1);
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const listKey = `myList_${currentUser.email}_${activeProfileId}`;
    const savedList = JSON.parse(localStorage.getItem(listKey) || "[]");
    setMyList(savedList);
  }, [activeProfileId, currentUser.email]);

  const updateMyList = (newList) => {
    setMyList(newList);
    const listKey = `myList_${currentUser.email}_${activeProfileId}`;
    localStorage.setItem(listKey, JSON.stringify(newList));
  };

  const handleProfileSwitch = (profileId) => {
    setActiveProfileId(profileId);
  };

  return (
    <div>
      <Header
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
        setSelectedGenre={setSelectedGenre}
        selectedCategory={selectedCategory}
        onProfileSwitch={handleProfileSwitch}
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
