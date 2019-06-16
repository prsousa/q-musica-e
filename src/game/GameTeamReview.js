import React from "react";
import { Card, Table } from "reactstrap";
import Musics from "../musics";

function GameTeamReview(props) {
  const { musics } = props;

  return (
    <Card className="p-4">
      <Table>
        <thead>
          <tr>
            <th>Artista</th>
            <th>Música</th>
            <th>Artista</th>
            <th>Música</th>
            <th>Bónus</th>
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
                  <td>{musicDb.artist}</td>
                  <td>{musicDb.music}</td>
                  <td>
                    {music.guessedArtist ? (
                      <span>&#10003;</span>
                    ) : (
                      <span>&#10007;</span>
                    )}
                  </td>
                  <td>
                    {music.guessedMusic ? (
                      <span>&#10003;</span>
                    ) : (
                      <span>&#10007;</span>
                    )}
                  </td>
                  <td>
                    {music.bonus ? (
                      <span>&#10003;</span>
                    ) : (
                      <span>&#10007;</span>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Card>
  );
}

export default GameTeamReview;
