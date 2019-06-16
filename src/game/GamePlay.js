import React from "react";
import { Link } from "react-router-dom";

import Musics from "../musics";
import Rules from "../rules";
import AudioPlayer from "./AudioPlayer";
import GameTeamReview from "./GameTeamReview";
import GameTeamMusicReview from "./GameTeamMusicReview";
import { Button } from "reactstrap";

function GamePlay(props) {
  const {
    game,
    team,
    isPlaying,
    countdown,
    reviewMusicIndex,
    skipPreview,
    currentMusicIndex,
    setPoints,
    canSkip
  } = props;
  const { roundSeconds } = game;
  const gameId = game.id;

  const { elapsedSeconds, musics } = team;
  const remainingSeconds = roundSeconds - elapsedSeconds;

  if (reviewMusicIndex >= 0)
    return (
      <GameTeamMusicReview
        music={musics[reviewMusicIndex]}
        skipPreview={skipPreview}
        setPoints={params =>
          setPoints(gameId, team.id, reviewMusicIndex, params)
        }
      />
    );

  if (team.completed || currentMusicIndex === -1)
    return (
      <div className="my-3">
        <h1>
          Q-Música é? #{gameId} | Equipa #{team.id}
        </h1>
        <hr />
        <GameTeamReview musics={musics} />
        <hr />
        <Link to={`/games/${gameId}`}>
          <Button color="danger">Voltar ao Jogo</Button>
        </Link>
      </div>
    );

  const currentMusic = musics[currentMusicIndex];
  const audioSource = `/musics/${Musics[currentMusic.musicId].file}`;
  const audioStartTime = (Musics[currentMusic.musicId].start || 0) * 1;
  console.log(audioSource);

  return (
    <div>
      <p className="display-1">{remainingSeconds}</p>
      <hr />
      {!isPlaying ? (
        <h2>{countdown}</h2>
      ) : (
        <div>
          <AudioPlayer source={audioSource} startTime={audioStartTime} />
          <div>
            <Button
              size="lg"
              color="danger"
              disabled={currentMusic.guessedMusic}
              onClick={() =>
                setPoints(gameId, team.id, currentMusicIndex, {
                  guessedMusic: true
                })
              }
            >
              Música (+{Rules.music})
            </Button>{" "}
            <Button
              size="lg"
              color="danger"
              disabled={currentMusic.guessedArtist}
              onClick={() =>
                setPoints(gameId, team.id, currentMusicIndex, {
                  guessedArtist: true
                })
              }
            >
              Artista (+{Rules.artist})
            </Button>{" "}
            <Button
              size="lg"
              color="danger"
              disabled={currentMusic.bonus}
              onClick={() =>
                setPoints(gameId, team.id, currentMusicIndex, {
                  bonus: true
                })
              }
            >
              Espalhou Magia! (+{Rules.bonus})
            </Button>{" "}
            <Button
              size="lg"
              color="danger"
              disabled={!canSkip}
              onClick={() =>
                setPoints(gameId, team.id, currentMusicIndex, {
                  listened: true
                })
              }
            >
              Passar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePlay;
