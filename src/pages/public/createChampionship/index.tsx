import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { createChampionship } from "../../../service/championship";
import { useNavigate } from "react-router-dom";
import { CreateChampionship } from "../../../service/championship/championship";

export function CreateChampionshipForm() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateChampionship>({
    mode: "onChange",
    defaultValues: {
      name: "",
      rounds: 0,
      bet: "",
    },
  });

  const onSubmit = async (data: CreateChampionship) => {
    try {
      const response = await createChampionship(data);
      const championshipId = response?.id
      navigate(`/addDrivers/${championshipId}`);
    } catch (error) {
      console.log("erro");
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
            render={({ field }) => (
              <TextField
                id="numberOfRaces"
                label="Número de corridas"
                type="number"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.rounds}
                helperText={
                  (errors.rounds?.type === "required" &&
                    "O número de corridas é obrigatório.") ||
                  (errors.rounds?.type === "min" &&
                    "O número mínimo de corridas é 1.") ||
                  (errors.rounds?.type === "max" &&
                    "O número máximo de corridas é 10.")
                }
                {...field}
              />
            )}
          />

          <Controller
            name="bet"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <TextField
                id="bet"
                label="O perderdor deve..."
                type="text"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.bet}
                helperText={
                  (errors.bet?.type ===
                    "Não vale a dignidade se não tiver que fazer nada.")
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
            disabled={!isValid}
          >
            Adicionar Jogadores
          </Button>
        </form>
      </Box>
    </Box>
  );
}
