import React, { Component } from "react";
import { Button, Form, Row, Col, FormGroup, Label, Input } from "reactstrap";
import Musics from "../musics";

class GameCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamCardinality: 4,
      roundSeconds: 120
    };
  }

  createGame() {
    this.props.createGame(
      this.state.teamCardinality,
      this.state.roundSeconds,
      Musics.length
    );
  }

  minMax(max, min, value) {
    value = Math.max(value, max);
    return Math.min(value, min);
  }

  render() {
    return (
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="teamCardinalityInput"># Equipas</Label>
              <Input
                id="teamCardinalityInput"
                type="number"
                placeholder="Número de Equipas"
                value={this.state.teamCardinality}
                onChange={e =>
                  this.setState({
                    teamCardinality: e.target.value
                  })
                }
                onBlur={() =>
                  this.setState({
                    teamCardinality: this.minMax(
                      2,
                      8,
                      this.state.teamCardinality
                    )
                  })
                }
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="roundSecondsInput">Tempo de Ronda</Label>
              <Input
                id="roundSecondsInput"
                type="number"
                placeholder="Tempo de Ronda (seg.)"
                value={this.state.roundSeconds}
                onChange={e =>
                  this.setState({
                    roundSeconds: e.target.value
                  })
                }
                onBlur={() =>
                  this.setState({
                    roundSeconds: this.minMax(60, 240, this.state.roundSeconds)
                  })
                }
              />
            </FormGroup>
          </Col>
        </Row>

        <Button size="lg" color="success" onClick={this.createGame.bind(this)}>
          Criar Jogo
        </Button>
      </Form>
    );
  }
}

export default GameCreate;
