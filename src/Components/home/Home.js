import { useState, useEffect } from "react";
import MovieList from "../movieList/MovieList"

export default function Home() {
  const [trending, setTrending] = useState([]);

  async function getTrending() {
    const url = process.env.REACT_APP_SERVER_URL;

    const response = await fetch(`${url}/trending`);

    const trendingData = await response.json();

    setTrending(trendingData);
    console.log(trendingData);
  }

  useEffect(() => {
    getTrending();
  }, []);

  return (
    <>
      <MovieList trending={trending} />
    </>
  );
}
