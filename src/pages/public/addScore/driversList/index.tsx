import React, { useState } from "react";
import { Button } from "@mui/material";

interface Driver {
  name: string;
}

interface DriverSelectionProps {
  drivers: Driver[];
  onNext: (selectedDriver: Driver | null) => void;
  onGoBack: () => void;
}

export function DriverSelection({
  drivers,
  onNext,
  onGoBack,
}: DriverSelectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDriverClick = (driver: Driver) => {
    onNext(driver);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleGoBack = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    onGoBack();
  };

  return (
    <div>
      <h2>Selecione o {currentIndex + 1}º colocado</h2>
      {drivers.map((driver, index) => (
        <Button
          key={index}
          variant="contained"
          onClick={() => handleDriverClick(driver)}
          fullWidth
          sx={{ mt: 1 }}
          disabled={index < currentIndex}
        >
          {`${index + 1}º - ${driver.name}`}
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
    </div>
  );
}
