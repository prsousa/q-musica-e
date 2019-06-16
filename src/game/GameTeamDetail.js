import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";

import { tickClock, setPoints } from "../redux/actions/game-actions";
import Musics from "../musics";
import Rules from "../rules";
import AudioPlayer from "./AudioPlayer";

const COUNTDOWN = 5;

class GameTeamDetail extends Component {
  constructor(props) {
    super(props);
    this.musicTime = 0;
    this.state = {
      isPlaying: false,
      countdown: COUNTDOWN
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentMusicIndex !== prevProps.currentMusicIndex) {
      this.musicTime = 0;
      this.setState({
        isPlaying: false,
        countdown: COUNTDOWN,
        canSkip: false
      });
    }
  }

  secondTick() {
    if (this.state.isPlaying) {
      const { game, team } = this.props;
      this.props.tickClock(game.id, team.id);
      if (++this.musicTime >= 10) {
        this.setState({ canSkip: true });
      }
    } else {
      const countdown = this.state.countdown - 1;
      const reached_zero = countdown < 1;

      this.setState({
        isPlaying: reached_zero,
        countdown: reached_zero ? 3 : countdown
      });
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.secondTick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render(props) {
    const { game, team, currentMusicIndex } = this.props;

    if (!game)
      return (
        <div>
          <p>Jogo Não Encontrado</p>
          <Link to="/games">
            <Button color="danger">Ver Jogos</Button>
          </Link>
        </div>
      );

    const { id, roundSeconds } = game;

    if (!team || team.completed || currentMusicIndex === -1)
      return (
        <div>
          <p>{!team ? "Equipa Não Encontrada" : "Esta Equipa Já Jogou"}</p>
          <Link to={`/games/${id}`}>
            <Button color="danger">Voltar ao Jogo</Button>
          </Link>
        </div>
      );

    const { elapsedSeconds, musics } = team;
    const remainingSeconds = roundSeconds - elapsedSeconds;

    const currentMusic = musics[currentMusicIndex];
    const audioSource = `/musics/${Musics[currentMusic.musicId].file}`;
    const audioStartTime = (Musics[currentMusic.musicId].start || 0) * 1;

    return (
      <div>
        <h1>{remainingSeconds}</h1>
        <hr />
        {!this.state.isPlaying ? (
          <h2>{this.state.countdown}</h2>
        ) : (
          <div>
            <AudioPlayer source={audioSource} startTime={audioStartTime} />
            <div>
              <Button
                color="danger"
                disabled={currentMusic.guessedMusic}
                onClick={() =>
                  this.props.setPoints(id, team.id, currentMusicIndex, {
                    guessedMusic: true
                  })
                }
              >
                Acertou na Música (+{Rules.music})
              </Button>
              <Button
                color="danger"
                disabled={currentMusic.guessedArtist}
                onClick={() =>
                  this.props.setPoints(id, team.id, currentMusicIndex, {
                    guessedArtist: true
                  })
                }
              >
                Acertou no Artista (+{Rules.artist})
              </Button>
              <Button
                color="danger"
                disabled={currentMusic.bonus}
                onClick={() =>
                  this.props.setPoints(id, team.id, currentMusicIndex, {
                    bonus: true
                  })
                }
              >
                Espalhou Magia! (+{Rules.bonus})
              </Button>
              <Button
                color="danger"
                disabled={!this.state.canSkip}
                onClick={() =>
                  this.props.setPoints(id, team.id, currentMusicIndex, {
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
}

function mapStateToProps(state, props) {
  const gameIdx = props.match.params.id;
  const teamIdx = props.match.params.teamId;
  const game = state.gameList.list[gameIdx - 1];
  const team = game ? game.teams[teamIdx - 1] : undefined;
  const currentMusicIndex = team ? team.musics.findIndex(m => !m.listened) : -1;

  return { game, team, currentMusicIndex };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      tickClock,
      setPoints
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameTeamDetail);
