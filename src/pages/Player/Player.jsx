import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { Link, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjdlMjZlOTIxZDYwYmNhMTZkMzRmZTY2ZjM0NGQ5NiIsIm5iZiI6MTc3NjkxNjYzMC43NjMsInN1YiI6IjY5ZTk5ODk2ZDBkMTVmNjhhOTMzNDFhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iBelZ5yHbfGxTJNbKXg4sDCZ4iFh33toO27mRMFXEXY",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options,
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <Link to="/">
        <img src={back_arrow_icon} alt="" />
      </Link>

      { apiData?.key ? 
        (<iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="trailer"
          frameborder="0"
          allowFullScreen
        ></iframe>) :
        (<p>No video available</p>)

      }
      <div className="player-info">
        <p>{apiData?.published_at.slice(0, 10)}</p>
        <p>{apiData?.name}</p>
        <p>{apiData?.type}</p>
      </div>
    </div>
  );
};

export default Player;
