import React from "react";
import { Button } from "reactstrap";
import Musics from "../musics";
import AudioPlayer from "./AudioPlayer";

function GameTeamMusicReview(props) {
  const { music, skipPreview } = props;
  const musicDb = Musics[music.musicId];
  const audioSource = `/musics/${Musics[music.musicId].file}`;
  const audioStartTime = (musicDb.start || 0) * 1;

  const CheckSign = <span className="text-success">&#10003;</span>;
  const CrossSign = <span>&#10007;</span>;

  return (
    <div>
      <AudioPlayer source={audioSource} startTime={audioStartTime} />
      <h1>
        {musicDb.artist} - {musicDb.music}
      </h1>
      <hr />
      <h2 className="text-dark">
        Artista {music.guessedArtist ? CheckSign : CrossSign} | Música{" "}
        {music.guessedMusic ? CheckSign : CrossSign} | Bónus{" "}
        {music.bonus ? CheckSign : CrossSign}
      </h2>
      <hr />
      <Button size="lg" color="primary" onClick={skipPreview}>
        Tá Ouvisto!
      </Button>
    </div>
  );
}

export default GameTeamMusicReview;
