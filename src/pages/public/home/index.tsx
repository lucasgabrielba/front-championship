import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" align="center" gutterBottom>
          Bem-vindo
        </Typography>
        <Typography variant="h6" align="center" paragraph>
          Organize campeonatos de corrida com os amigos
        </Typography>
        <Button
          onClick={() => navigate("/newChampionship")}
          variant="contained"
          color="primary"
          sx={{ alignSelf: "center" }}
        >
          Criar novo campeonato
        </Button>
        <Button
          onClick={() => navigate("/statistics")}
          variant="outlined"
          color="primary"
          sx={{ alignSelf: "center", marginTop: "10px" }}
        >
          Estatisticas de jogadores
        </Button>
      </Container>
    </>
  );
}
