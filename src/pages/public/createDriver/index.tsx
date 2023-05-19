import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';

interface RunnerFormData {
  name: string;
}

export function AddRunnerForm() {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<RunnerFormData>();
  const [runners, setRunners] = useState<string[]>([]);

  const onSubmit = (data: RunnerFormData) => {
    setRunners([...runners, data.name]);
    setValue('name', '');
  };

  return (
    <Paper sx={{ padding: 2, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom> Add Runners </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : null}
            />
          )}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}> Add Runner </Button>
      </form>
      <Box mt={2}>
        {runners.map((runner, index) => (
          <Typography key={index} variant="body2"> {runner} </Typography>
        ))}
      </Box>
    </Paper>
  );
};

