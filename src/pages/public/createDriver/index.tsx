import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, Box, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { createDriversAndScores, getTable } from "../../../service/score";

interface RunnerFormData {
  name: string;
}

export function AddRunnerForm() {
  const { championshipId } = useParams();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RunnerFormData>();
  const [runners, setRunners] = useState<string[]>([]);

  const onSubmit = (data: RunnerFormData) => {
    if (runners.length < 8) {
      setRunners([...runners, data.name]);
      setValue("name", "");
    }
  };

  const removeRunner = (index: number) => {
    const updatedRunners = [...runners];
    updatedRunners.splice(index, 1);
    setRunners(updatedRunners);
  };

  const handleCreateChampionship = async () => {
    try {
      await createDriversAndScores(runners, championshipId!);
      navigate(`/driversTable/${championshipId}`);
    } catch {
      console.log("erro ao criar drivers");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTable(championshipId!);
        const drivers = response?.map(item => item.driver.name);
        if (drivers) {
          setRunners(drivers);
        }
      } catch (error) {
        console.log('err', error);
      }
    };

    fetchData();
  }, [championshipId]);


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
        <Typography variant="h4" gutterBottom>
          Adicione Jogadores
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {`Jogadores adicionados: ${runners.length}/8`}
        </Typography>
        <Box mt={2}>
          {runners.map((runner, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
            >
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                {runner}
              </Typography>
              <IconButton onClick={() => removeRunner(index)} size="small">
                <Delete />
              </IconButton>
            </Box>
          ))}
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required:
                "Conhece alguém sem nome? Não né?! Então coloca um nome.",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome do infeliz"
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : null}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={runners.length >= 8}
          >
            Adicionar Jogador
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, ml: 2 }}
            onClick={handleCreateChampionship}
            disabled={runners.length < 2}
          >
            Salvar
          </Button>
        </form>
      </Box>
    </Box>
  );
}
