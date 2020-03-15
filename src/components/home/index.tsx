import React from "react";
import NewGames from "./newGames";
import SearchGames from "./searchGames";

const HomePage: React.FC = () => {
  return (
    <>
      <SearchGames />
      <NewGames />
    </>
  );
};

export default HomePage;
