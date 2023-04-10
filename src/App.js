import "./App.css";
import Home from "./Components/home/Home";
import FavList from "./Components/favList/FavList";
import NavBar from "./Components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favList" element={<FavList />} />
      </Routes>
    </>
  );
}

export default App;
