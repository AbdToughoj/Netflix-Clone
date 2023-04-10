import { useState, useEffect } from "react";
import MovieList from "../movieList/MovieList";

export default function Home() {
  const [trending, setTrending] = useState([]);

  async function getTrending() {
    const url = process.env.REACT_APP_SERVER_URL;

    const response = await fetch(`${url}/trending`);

    const trendingData = await response.json();

    setTrending(trendingData);
  }

  function commentHandler(newTrending, id) {
    trending.map((trending) => {
      if (trending.id === id) {
        trending.comment = newTrending.userComment;
        return trending;
      } else {
        return trending;
      }
    });
  }

  useEffect(() => {
    getTrending();
  }, []);

  return (
    <>
      <MovieList trending={trending} commentHandler={commentHandler} />
    </>
  );
}
