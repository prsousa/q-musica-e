import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";

import { tickClock, setPoints } from "../redux/actions/game-actions";
import GamePlay from "./GamePlay";
import ScoreDisplayer from "./ScoreDisplayer";

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
        canSkip: false,
        reviewMusicIndex: prevProps.currentMusicIndex
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
    } else if (this.state.reviewMusicIndex >= 0) {
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

  skipPreview() {
    this.setState({
      reviewMusicIndex: -1
    });
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

    if (!team)
      return (
        <div>
          <p>Equipa Não Encontrada</p>
          <Link to={`/games/${game.id}`}>
            <Button color="danger">Voltar ao Jogo</Button>
          </Link>
        </div>
      );

    return (
      <div>
        <ScoreDisplayer game={game} highlightedTeam={team} />
        <GamePlay
          game={game}
          team={team}
          isPlaying={this.state.isPlaying}
          countdown={this.state.countdown}
          reviewMusicIndex={this.state.reviewMusicIndex}
          currentMusicIndex={currentMusicIndex}
          setPoints={this.props.setPoints.bind(this)}
          skipPreview={this.skipPreview.bind(this)}
          canSkip={this.state.canSkip}
        />
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
