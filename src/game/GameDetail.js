import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { Table, Card, Button } from "reactstrap";

class GameDetail extends Component {
  render(props) {
    if (!this.props.game)
      return (
        <div>
          <p>Jogo Não Encontrado</p>
          <Link to="/games">
            <Button color="danger">Ver Jogos</Button>
          </Link>
        </div>
      );

    const { teams, id } = this.props.game;
    const pendingTeams = teams.filter(t => !t.completed);
    const nextTeam = pendingTeams[0];

    return (
      <div>
        <h1>Q-Música é? #{id}</h1>
        <hr />
        <h2>Equipas</h2>
        <Card>
          <Table>
            <thead>
              <tr>
                <th>Equipa</th>
                <th>Já Jogou?</th>
                <th>Pontos</th>
              </tr>
            </thead>
            <tbody>
              {teams.map(team => (
                <tr key={team.id}>
                  <th scope="row">{team.id}</th>
                  <td>{team.completed ? "Sim" : "Não"}</td>
                  <td>{team.points}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        <hr />
        {nextTeam ? (
          <Link to={`/games/${id}/teams/${nextTeam.id}`}>
            <Button color="danger">
              Começar Próxima Ronda <br />
              (Equipa {nextTeam.id})
            </Button>
          </Link>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const gameIdx = props.match.params.id;
  return {
    game: state.gameList.list[gameIdx - 1]
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameDetail);
