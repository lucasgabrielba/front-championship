import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getStatistcs } from "../../../service/score";
import { Statistics } from "../../../service/score/score";
import { useNavigate } from "react-router-dom";

export function StatisticsModule() {
  const navigate = useNavigate();
  const [playersData, setPlayersData] = useState<Statistics[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await getStatistcs();
        if (response) {
          setPlayersData(response);
        }
      } catch (err) {
        console.log("err", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStatistics();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ mx: "auto" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Estatísticas
        </Typography>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 2,
            }}
          >
            <CircularProgress />
            <Typography variant="body1" align="center" sx={{ pt: 1 }}>
              Carregando...
            </Typography>
          </Box>
        ) : (
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
                {playersData?.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{player.name}</TableCell>
                    <TableCell align="center">{player.points}</TableCell>
                    <TableCell align="center">{player.wons}</TableCell>
                    <TableCell align="center">{player.losts}</TableCell>
                    <TableCell align="center">{player.championships}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      </Box>
    </Box>
  );
}
