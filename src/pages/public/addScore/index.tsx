import { useEffect, useState } from "react";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ScoreDTO } from "../../../service/score/score";
import { addScoreInDrivers, getTable } from "../../../service/score";

export interface Driver {
  id: string
  name: string;
}

export function AddScore() {
  const { championshipId } = useParams();
  const navigate = useNavigate();

  const [driversData, setDriversData] = useState<ScoreDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDrivers, setSelectedDrivers] = useState<Driver[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScores = async () => {
      try {
        const response = await getTable(championshipId!);
        if (response) {
          setDriversData(response);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    handleScores();
  }, [championshipId]);

  const handleDriverClick = (driver: Driver) => {
    if (selectedDrivers.length === currentIndex) {
      setSelectedDrivers((prevDrivers) => [...prevDrivers, driver]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleGoBack = () => {
    setSelectedDrivers((prevDrivers) => prevDrivers.slice(0, -1));
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const drivers = driversData.filter(
    (driver) => !selectedDrivers.includes(driver.driver)
  );
  const isLastDriverSelected = currentIndex === driversData.length;

  const handleConfirmScore = async () => {
    try {
      await addScoreInDrivers(selectedDrivers, championshipId!)
      navigate(`/driversTable/${championshipId}`);
    } catch (err) {
      console.log('err');
    }
  };

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
      <Box sx={{ maxWidth: "400px", mx: "auto" }}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box mb={2}>
              {selectedDrivers.map((driver, index) => (
                <Typography variant="h6" align="center" key={index}>{`${index + 1
                  }º - ${driver.name}`}</Typography>
              ))}
            </Box>
            {isLastDriverSelected ? (
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleConfirmScore}
              >
                Confirmar Pontuação
              </Button>
            ) : (
              <>
                <Typography variant="h5" align="center">
                  Selecione o {currentIndex + 1}º colocado
                </Typography>
                {drivers.map((driver, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    onClick={() => handleDriverClick(driver.driver)}
                    fullWidth
                    sx={{ mt: 1 }}
                    disabled={selectedDrivers.length !== currentIndex}
                  >
                    {driver.driver.name}
                  </Button>
                ))}
                <Button
                  variant="contained"
                  onClick={handleGoBack}
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={currentIndex === 0}
                >
                  Voltar
                </Button>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
