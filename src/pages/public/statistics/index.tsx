import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

interface data {
  name: string
  points: number 
  winners: number
  losers: number
  championships: number
}

export function PlayersTable() {
  const [playersData, setPlayersData] = useState<data>();

  useEffect(() => {
    // Aqui você pode fazer uma chamada para o backend para obter os dados dos jogadores
    // e em seguida, definir os valores utilizando a função setPlayersData.
    // Exemplo fictício:
    // const response = await fetch("/api/playersData");
    // const data = await response.json();
    // setPlayersData(data.playersData);

    // Comente as linhas abaixo após implementar a chamada ao backend e definir os valores corretamente.
    const data = [
      { name: "Jogador 1", points: 100, winners: 5, losers: 3, championships: 2 },
      { name: "Jogador 2", points: 80, winners: 4, losers: 2, championships: 3 },
      { name: "Jogador 3", points: 60, winners: 3, losers: 4, championships: 1 },
    ];
    setPlayersData(data);
  }, []);

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Número de campeonatos que participou: {playersData.length}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Jogador</TableCell>
              <TableCell>Pontos totais</TableCell>
              <TableCell>Winners</TableCell>
              <TableCell>Losers</TableCell>
              <TableCell>Número de campeonatos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playersData.map((player, index) => (
              <TableRow key={index}>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.points}</TableCell>
                <TableCell>{player.winners}</TableCell>
                <TableCell>{player.losers}</TableCell>
                <TableCell>{player.championships}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
