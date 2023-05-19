import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { createChampionship } from "../../../service/championship";
import { useNavigate } from "react-router-dom";

export function CreateChampionshipForm() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = (data: any) => {
    try{
      createChampionship(data);
     
    }catch{
      console.log("erro")
    }
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
        <Typography variant="h4" color="initial">
          Novo campeonato
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                id="name"
                label="Nome"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.name}
                helperText={
                  errors.name?.type === "required" &&
                  "O nome do campeonato é obrigatório."
                }
                {...field}
              />
            )}
          />

          <Controller
            name="rounds"
            control={control}
            rules={{ required: true, min: 1, max: 10 }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                id="numberOfRaces"
                label="Número de corridas"
                type="number"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.numberOfRaces}
                helperText={
                  (errors.numberOfRaces?.type === "required" &&
                    "O número de corridas é obrigatório.") ||
                  (errors.numberOfRaces?.type === "min" &&
                    "O número mínimo de corridas é 1.")
                }
                {...field}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 1 }}
            onClick={() => navigate("/addDrivers")}
          >
            Criar campeonato
          </Button>
        </form>
      </Box>
    </Box>
  );
}
