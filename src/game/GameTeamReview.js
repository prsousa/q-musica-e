import React from "react";
import { Card, Table } from "reactstrap";
import Musics from "../musics";

function GameTeamReview(props) {
  const { musics } = props;

  const CheckSign = <span className="text-success">&#10003;</span>;
  const CrossSign = <span>&#10007;</span>;

  return (
    <Card className="p-4">
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Artista</th>
            <th>Música</th>
            <th>Artista</th>
            <th>Música</th>
            <th>Magia</th>
          </tr>
        </thead>
        <tbody>
          {musics
            .filter(
              m => m.listened || m.guessedArtist || m.guessedMusic || m.bonus
            )
            .map((music, i) => {
              const musicDb = Musics[music.musicId];
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{musicDb.artist}</td>
                  <td>{musicDb.music}</td>
                  <td>{music.guessedArtist ? CheckSign : CrossSign}</td>
                  <td>{music.guessedMusic ? CheckSign : CrossSign}</td>
                  <td>{music.bonus ? CheckSign : CrossSign}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Card>
  );
}

export default GameTeamReview;
