import React, { useEffect, useState } from "react";
import { DriversTable } from "./table";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getTable } from "../../../service/score";
import { ScoreDTO } from "../../../service/score/score";

export function TableChampionship() {
  const { championshipId } = useParams();
  const navigate = useNavigate();

  const [championshipName, setChampionshipName] = useState<string>();
  const [drivers, setDrivers] = useState<ScoreDTO[]>([]);
  const [currentStage, setCurrentStage] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleScores = async () => {
      try {
        const response = await getTable(championshipId!);
        if (response) {
          setDrivers(response);
          setChampionshipName(response[0]?.championship.name);
          setCurrentStage(response[0]?.championship.stage);
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
            <Typography
              variant="body1"
              align="center"
              sx={{ pt: 1 }}
            >
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
            <Typography variant="h6" align="center" sx={{ paddingBottom: 1 }}>
              Etapa {currentStage}
            </Typography>
            <DriversTable drivers={drivers} />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleAddScoreClick}
            >
              Adicionar Nova Pontuação
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
