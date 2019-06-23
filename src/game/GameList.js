import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { Card, Table } from "reactstrap";

import { createGame } from "../redux/actions/game-actions";
import GameCreate from "./GameCreate";

class GameList extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.gameList.length !== prevProps.gameList.length) {
      const createdGameIdx = this.props.gameList.length;
      this.props.history.push(`/games/${createdGameIdx}`);
    }
  }

  render(props) {
    const { gameList } = this.props;
    return (
      <div className="my-3">
        <h1>Q-Música é?</h1>
        <hr />
        <div>
          <h2 className="py-3">Histórico de Jogos</h2>
          {gameList.length > 0 ? (
            <Card className="p-4">
              <Table>
                <thead>
                  <tr>
                    <th>Jogo</th>
                    <th>#Equipas</th>
                    <th>Duração (seg.)</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {gameList
                    .sort((a, b) => b.id - a.id)
                    .map(game => (
                      <tr key={game.id}>
                        <th scope="row">{game.id}</th>
                        <td>{game.teams.length}</td>
                        <td>{game.roundSeconds}</td>
                        <td>
                          <Link to={`/games/${game.id}`}>ver</Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card>
          ) : (
            <small>- Sem Jogos -</small>
          )}
        </div>
        <hr />
        <GameCreate createGame={this.props.createGame} />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    gameList: [...state.gameList.list]
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createGame
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameList);
