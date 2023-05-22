import React, { useEffect, useState } from "react";
import { DriversTable } from "./table";
import { Box, Button, CircularProgress, Collapse, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getTable, resetChampionship } from "../../../service/score";
import { ScoreDTO } from "../../../service/score/score";

export function TableChampionship() {
  const { championshipId } = useParams();
  const navigate = useNavigate();

  const [championshipName, setChampionshipName] = useState<string>();
  const [drivers, setDrivers] = useState<ScoreDTO[]>([]);
  const [currentStage, setCurrentStage] = useState<number>();
  const [rounds, setRounds] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useEffect(() => {
    const handleScores = async () => {
      try {
        const response = await getTable(championshipId!);
        if (response) {
          setDrivers(response);
          setChampionshipName(response[0]?.championship.name);
          setCurrentStage(response[0]?.championship.stage);
          setRounds(response[0]?.championship.rounds);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    handleScores();
  }, [championshipId]);

  const handleAddScoreClick = () => {
    navigate(`/addScore/${championshipId}`);
  };

  const handleRestartChampionship = async () => {
    try {
      await resetChampionship(drivers);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCreateNewChampionship = () => {
    navigate("/newChampionship");
  };

  const handleEditDrivers = () => {
    navigate(`/addDrivers/${championshipId}`);
  };

  const handleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ maxWidth: "400px", mx: "auto" }}>
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
          <>
            <Typography
              variant="h4"
              align="center"
              sx={{ paddingTop: 2, paddingBottom: 1 }}
            >
              {championshipName}
            </Typography>
            {currentStage !== rounds ? (
              <Typography
                variant="h6"
                align="center"
                sx={{ paddingBottom: 1 }}
              >
                Etapa {currentStage! + 1}/{rounds}
              </Typography>
            ) : (
              <Typography
                variant="h6"
                align="center"
                sx={{ paddingBottom: 1 }}
              >
                Resultado Final
              </Typography>
            )}
            <DriversTable drivers={drivers} />
            {currentStage === rounds ? (
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="h6" color="error" sx={{ mb: 1 }}>
                  {drivers[drivers.length - 1]?.driver.name} tomou no cu e terá que{" "}
                  {drivers[0]?.championship.bet}
                </Typography>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 2, mb: 2 }}
                onClick={handleAddScoreClick}
              >
                Adicionar Nova Pontuação
              </Button>
            )}
              <Button
              variant="contained"
              fullWidth
              onClick={handleShowOptions}
              sx={{ mb: 1 }}
            >
              {showOptions ? "Ocultar Opções" : "Mostrar Opções"}
            </Button>
            <Collapse in={showOptions}>
              <Box>
                  <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleEditDrivers}
                  sx={{ mb: 1 }}
                >
                  Editar Jogadores
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleRestartChampionship}
                  sx={{ mb: 1 }}
                >
                  Reiniciar Campeonato
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleCreateNewChampionship}
                >
                  Criar Novo Campeonato
                </Button>
              </Box>
            </Collapse>
          
          </>
        )}
      </Box>
    </Box>
  );
}
