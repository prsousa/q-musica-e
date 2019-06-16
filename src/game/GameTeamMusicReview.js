import React from "react";
import { Button } from "reactstrap";
import Musics from "../musics";
import AudioPlayer from "./AudioPlayer";

function GameTeamMusicReview(props) {
  const { music, skipPreview, setPoints } = props;
  const musicDb = Musics[music.musicId];
  const audioSource = `/musics/${Musics[music.musicId].file}`;
  const audioStartTime = (musicDb.start || 0) * 1;

  const CheckSign = <span className="text-success">&#10003;</span>;
  const CrossSign = <span>&#10007;</span>;

  return (
    <div>
      <AudioPlayer source={audioSource} startTime={audioStartTime} delay={2} />
      <img src="/logo.png" className="App-logo Listening-logo" alt="logo" />
      <h1 className="text-uppercase">
        {musicDb.artist} - {musicDb.music}
      </h1>
      <hr />
      <h2 className="text-dark">
        <span
          onClick={() =>
            setPoints({
              guessedMusic: !music.guessedMusic
            })
          }
        >
          Música {music.guessedMusic ? CheckSign : CrossSign}
        </span>
        {" | "}
        <span
          onClick={() =>
            setPoints({
              guessedArtist: !music.guessedArtist
            })
          }
        >
          Artista {music.guessedArtist ? CheckSign : CrossSign}
        </span>
        {" | "}
        <span
          onClick={() =>
            setPoints({
              bonus: !music.bonus
            })
          }
        >
          Magia {music.bonus ? CheckSign : CrossSign}
        </span>
      </h2>
      <hr />
      <Button size="lg" color="primary" onClick={skipPreview}>
        Tá Ouvisto!
      </Button>
    </div>
  );
}

export default GameTeamMusicReview;
