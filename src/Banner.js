import axios from "./axios";
import React from "react";
import { useState, useEffect } from "react";
import "./Banner.css";
import requests from "./Request";
const base_url = "https://image.tmdb.org/t/p/original/";


const Banner = () => {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length -1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);
  function trancate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('${base_url}${movie?.backdrop_path}')`,
        backgroundPosition: "center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.name || movie?.title || movie?.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {trancate(
            movie?.overview,
            150
          )}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </div>
  );
};

export default Banner;
